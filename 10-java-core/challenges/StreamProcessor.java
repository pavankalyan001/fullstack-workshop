import java.util.List;
import java.util.OptionalDouble;

public class StreamProcessor {

    public static OptionalDouble averageOfEvens(List<Integer> numbers) {
        return numbers.stream()
                .filter(n -> n % 2 == 0)
                .mapToInt(Integer::intValue)
                .average();
    }

    public static void main(String[] args) {
        System.out.println(averageOfEvens(List.of(1,2,3,4,5,6))); // OptionalDouble[4.0]
        System.out.println(averageOfEvens(List.of(1,3,5)));       // OptionalDouble.empty
    }
}
