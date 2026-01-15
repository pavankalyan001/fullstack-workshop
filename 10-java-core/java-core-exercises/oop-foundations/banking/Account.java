package oop_foundations.banking;

public abstract class Account {
    private static int counter = 2000;
    protected int accountNumber;
    protected String holderName;
    protected double balance;

    public Account(String holderName, double balance) {
        this.accountNumber = counter++;
        this.holderName = holderName;
        this.balance = balance;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public abstract double calculateInterest();

    public void withdraw(double amount) {
        if (amount <= balance) balance -= amount;
        else System.out.println("Withdrawal failed.");
    }

    public double getBalance() {
        return balance;
    }

    public String getHolderName() {
        return holderName;
    }
}
