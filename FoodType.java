import java.time.LocalDateTime;

public class FoodType {
    private String name;
    private int quantity;
    private String type;
    private String superType;
    private LocalDateTime expirationdate;
    private double latitude;
    private double longitude;
    private String vendor;

    public FoodType(String name, int quantity, String type, String superType, LocalDateTime expirationdate, double latitude, double longitude, String vendor) {
        this.name = name;
        this.quantity = quantity;
        this.type = type;
        this.superType = superType;
        this.expirationdate = expirationdate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.vendor = vendor;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getType() {
        return type;
    }

    public String getSuperType() {
        return superType;
    }

    public LocalDateTime getExpirationdate() {
        return expirationdate;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getVendor() {
        return vendor;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSuperType(String superType) {
        this.superType = superType;
    }

    public void setExpirationdate(LocalDateTime expirationdate) {
        this.expirationdate = expirationdate;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }
}
