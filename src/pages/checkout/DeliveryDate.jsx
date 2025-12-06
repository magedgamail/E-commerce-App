import dayjs from "dayjs";

export function DeliveryDate({ deliveryOptions, cartItem }) {
    const selectedDeliveryOption = deliveryOptions.find(
                        (deliveryOptions) => {
                            return deliveryOptions.id === cartItem.deliveryOptionId;
                        }
                    );
    return (
        <>
            <div className="delivery-date">
                                Delivery date:{" "}
                                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                                    "dddd, MMMM D"
                                )}
                            </div>
        </>
    )
}