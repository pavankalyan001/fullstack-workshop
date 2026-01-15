package oop_foundations;

public class Triangle extends Shape {
    private double base, height, side1, side2, side3;

    public Triangle(double base, double height, double side1, double side2, double side3) {
        this.base = base;
        this.height = height;
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    public double area() {
        return 0.5 * base * height;
    }

    public double perimeter() {
        return side1 + side2 + side3;
    }
}
