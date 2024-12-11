function onload() {
    const box = document.querySelector(".sample-dresses-child");

    if (!box) {
        console.error("Container element with class 'sample-dresses-child' not found.");
        return;
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const dataprocess = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/Pointer-Fashion/json_file_store/refs/heads/main/json%20%20create/boys%20t-shirt.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const datasplit = await response.json();
            shuffleArray(datasplit);

            datasplit.forEach((item, index) => {
                const uniqueId = `size-selector-${index}`;
                box.innerHTML += `
                    <div class="dress">
                        <div class="dress-img">
                            <img src="${item.image}" alt="Dress Image">
                        </div>
                        <div class="dress-details">
                            <table>
                                <tr>
                                    <td>Type: ${item.type}</td>
                                </tr>
                                <tr>
                                    <td>Size:
                                        <select id="${uniqueId}">
                                            <option value="XL">XL</option>
                                            <option value="L">L</option>
                                            <option value="M">M</option>
                                            <option value="S">S</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Price: ${item.price}</td>
                                </tr>
                                <tr>
                                    <td><button onclick="sendOrderDetails('${item.image}', '${item.type}', '${item.price}', '${uniqueId}')">BUY</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    };

    dataprocess();
}

function sendOrderDetails(image, type, price, sizeSelectorId) {
    const size = document.getElementById(sizeSelectorId).value;

    const message = `New Order Details:
- Type: ${type}
- Size: ${size}
- Price: ${price}
- Image: ${image}`;

    const encodedMessage = encodeURIComponent(message);
    const companyNumber = "91 9842250208"; // Replace with the company's WhatsApp number
    const whatsappURL = `https://wa.me/${companyNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
}

onload();
