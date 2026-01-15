package oop_foundations.banking;

public class CheckingAccount extends Account {
    private static final double OVERDRAFT_LIMIT = 500;

    public CheckingAccount(String holderName, double balance) {
        super(holderName, balance);
    }

    @Override
    public double calculateInterest() {
        return 0;
    }

    @Override
    public void withdraw(double amount) {
        if (amount <= balance + OVERDRAFT_LIMIT) {
            balance -= amount;
        } else {
            System.out.println("Overdraft limit exceeded.");
        }
    }
}
