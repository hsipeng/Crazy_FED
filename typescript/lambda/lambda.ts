var Shape = {
  name: "rectangle",
  popup: function () {
    console.log('this inside popu();' + this.name);

    setTimeout(() => {
      console.log('this inside setTimeout():' + this.name);
      console.log("I'm a " + this.name + "!")
    }, 3000);
  }
}

Shape.popup();