// Примерна интеграция с библиотека за сканиране, напр. QuaggaJS

function startBarcodeScanner() {
  Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#barcode-scanner')    // Тук трябва елемент за видео
    },
    decoder : {
      readers : ["code_128_reader","ean_reader","ean_8_reader","upc_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return;
      }
      console.log("Barcode scanner initialized.");
      Quagga.start();
  });

  Quagga.onDetected(data => {
    const code = data.codeResult.code;
    console.log("Barcode detected:", code);
    // Тук можеш да търсиш продукта по кода и да показваш данни
    // Пример:
    getProducts(products => {
      if(products[code]) {
        alert(`Продукт: ${products[code].name}\nНаличност: ${products[code].stock}\nЦена: ${products[code].priceBgn.toFixed(2)} лв.`);
      } else {
        alert('Продуктът не е намерен.');
      }
    });
  });
}
