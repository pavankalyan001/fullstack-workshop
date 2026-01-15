package oop_foundations.banking;

import java.util.ArrayList;
import java.util.List;

public class Bank {
    private String name;
    private List<Account> accounts = new ArrayList<>();

    public Bank(String name) {
        this.name = name;
    }

    public void addAccount(Account acc) {
        accounts.add(acc);
    }

    public double getTotalDeposits() {
        return accounts.stream()
                .mapToDouble(Account::getBalance)
                .sum();
    }

    public List<Account> getAllAccounts() {
        return accounts;
    }
}
