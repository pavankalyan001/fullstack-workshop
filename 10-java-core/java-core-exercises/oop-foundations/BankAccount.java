package oop_foundations;

public class BankAccount {
    private static String bankName = "MyBank";
    private static int totalAccounts = 0;
    private static int accountCounter = 1000;

    private int accountNumber;
    private String holderName;
    private double balance;

    public BankAccount(String holderName, double balance) {
        this.accountNumber = accountCounter++;
        this.holderName = holderName;
        this.balance = balance;
        totalAccounts++;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Insufficient balance.");
        }
    }

    public double getBalance() {
        return balance;
    }

    public static String getBankInfo() {
        return bankName + " - Total Accounts: " + totalAccounts;
    }
}
