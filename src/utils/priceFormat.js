const priceFormat = (price) => {
    
  return  price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

export default priceFormat;