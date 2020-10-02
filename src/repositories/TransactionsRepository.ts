import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const result = transactions.reduce(
      (acc, curr) => {
        switch (curr.type) {
          case 'income':
            return {
              ...acc,
              income: acc.income + Number(curr.value),
              total: acc.total + Number(curr.value),
            };
          case 'outcome':
            return {
              ...acc,
              outcome: acc.outcome + Number(curr.value),
              total: acc.total - Number(curr.value),
            };
          default:
            return acc;
        }
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return result;
  }
}

export default TransactionsRepository;
