import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.Queue;

public class FoodQueue {
    //test
    Queue<FoodType> foodQueue = new LinkedList<FoodType>();

    public void addItem(FoodType food) {
        foodQueue.add(food);
    }

    public void removeItem(FoodType food) {
        foodQueue.remove(food);
    }

    public String numberOfItems(FoodType food) {
        return food.getQuantity() + " " + food.getName();
    }

    public FoodType peek() {
        return foodQueue.peek();
    }

    public FoodType poll() {
        return foodQueue.poll();
    }

    public FoodType printqueue() {
        for (FoodType food : foodQueue) {
            return food;
        }
        return null;
    }

    public static void loadItems(String filePath, Queue<FoodType> foodQueue) throws FileNotFoundException {
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            br.readLine();

            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                if (values.length == 4) {
                    String name = values[0].trim();
                    String type = values[1].trim();
                    int quantity = Integer.parseInt(values[2].trim());
                    LocalDateTime expirationdate = LocalDateTime.parse(values[3].trim());
                    String superType = values[4].trim();
                    String vendor = values[5].trim();
                    double latitude = Double.parseDouble(values[6].trim());
                    double longitude = Double.parseDouble(values[7].trim());

                    foodQueue.add(new FoodType(name, quantity, type, superType, expirationdate, latitude, longitude, vendor));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
