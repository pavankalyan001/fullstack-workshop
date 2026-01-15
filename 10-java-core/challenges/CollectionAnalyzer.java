import java.util.*;
import java.util.stream.Collectors;

public class CollectionAnalyzer {

    public static Map<Integer, List<String>> groupByLength(List<String> words) {
        return words.stream()
                .collect(Collectors.groupingBy(String::length));
    }

    public static Map<Character, Long> charFrequency(List<String> words) {
        return words.stream()
                .flatMapToInt(String::chars)
                .mapToObj(c -> (char) c)
                .collect(Collectors.groupingBy(ch -> ch, Collectors.counting()));
    }

    public static void main(String[] args) {
        System.out.println(groupByLength(List.of("hi","bye","hello","ok")));
        System.out.println(charFrequency(List.of("aab","bc")));
    }
}
