export abstract class BankAccount {
    private static _totalAccounts = 0;
  
    public static get totalAccounts(): number {
      return BankAccount._totalAccounts;
    }
  
    private readonly _ownerName: string;
    private _balance: number;
  
    constructor(ownerName: string, initialBalance: number) {
      this._ownerName = ownerName;
      this._balance = initialBalance;
      BankAccount._totalAccounts++;
    }
  
    public deposit(amount: number): void {
      this._balance += amount;
    }
  
    public withdraw(amount: number): void {
      this._balance -= amount;
    }
  
    public getBalance(): number {
      return this._balance;
    }
  
    // ✅ This fixes the unused property error
    public getOwnerName(): string {
      return this._ownerName;
    }
  
    public static displayTotalAccounts(): void {
      console.log(`Total Accounts: ${BankAccount.totalAccounts}`);
    }
  
    public abstract calculateInterest(): number;
  }
  
  export class SavingsAccount extends BankAccount {
    private _interestRate: number;
  
    constructor(ownerName: string, initialBalance: number, interestRate: number) {
      super(ownerName, initialBalance);
      this._interestRate = interestRate;
    }
  
    public calculateInterest(): number {
      return this.getBalance() * this._interestRate;
    }
  }
  
  export class CheckingAccount extends BankAccount {
    private _transactionLimit: number;
  
    constructor(ownerName: string, initialBalance: number, transactionLimit: number) {
      super(ownerName, initialBalance);
      this._transactionLimit = transactionLimit;
    }
  
    public withdraw(amount: number): void {
      if (amount <= this._transactionLimit) {
        super.withdraw(amount);
      } else {
        console.log(`Warning: Exceeds transaction limit of $${this._transactionLimit}`);
      }
    }
  
    public calculateInterest(): number {
      return 0;
    }
  }
  