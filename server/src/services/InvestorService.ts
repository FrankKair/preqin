import { AppDataSource } from "../DataSource";
import { Investor, Commitment } from "../entities";

export class InvestorService {
  private investorRepository = AppDataSource.getRepository(Investor);
  private commitmentRepository = AppDataSource.getRepository(Commitment);

  getInvestors = async () => {
    return await this.investorRepository.find({
      relations: ["commitments"],
      order: {
        name: "ASC",
      },
    });
  };

  getInvestorById = async (id: number) => {
    return await this.investorRepository.findOne({
      where: { id },
      relations: ["commitments"]
    });
  };

  createInvestor = async (data: Partial<Investor>) => {
    const newInvestor = this.investorRepository.create(data);
    return await this.investorRepository.save(newInvestor);
  };

  getCommitmentsByInvestor = async (investorId: number) => {
    return await this.commitmentRepository.find({
      where: { investor: { id: investorId } }
    });
  };
}
