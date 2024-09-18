import 'reflect-metadata';
import * as fs from 'fs';
import csv from 'csv-parser';
import { AppDataSource } from './DataSource';
import { Investor, Commitment } from './entities';

async function seedDatabase() {
    await AppDataSource.initialize();

    const investorsMap = new Map<string, Investor>();
    const commitments: Commitment[] = [];

    fs.createReadStream('./data.csv')
        .pipe(csv())
        .on('data', (row) => {
            const {
                'Investor Name': name,
                'Investory Type': type,
                'Investor Country': country,
                'Investor Date Added': dateAdded,
                'Investor Last Updated': lastUpdated,
                'Commitment Asset Class': assetClass,
                'Commitment Amount': amount,
                'Commitment Currency': currency,
            } = row;

            const dateAddedDate = new Date(dateAdded);
            const lastUpdatedDate = new Date(lastUpdated);

            if (!investorsMap.has(name)) {
                const investor = new Investor();
                investor.name = name;
                investor.type = type;
                investor.country = country;
                investor.dateAdded = dateAddedDate;
                investor.lastUpdated = lastUpdatedDate;
                investorsMap.set(name, investor);
            }

            const investor = investorsMap.get(name)!;
            const commitment = new Commitment();
            commitment.assetClass = assetClass;
            commitment.amount = parseInt(amount, 10);
            commitment.currency = currency;
            commitment.investor = investor;
            commitments.push(commitment);
        })
        .on('end', async () => {
            for (const investor of investorsMap.values()) {
                await AppDataSource.manager.save(investor);
            }

            for (const commitment of commitments) {
                await AppDataSource.manager.save(commitment);
            }

            console.log('Seeding completed.');
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
        });
}

seedDatabase().catch((error) => console.error(error));
