app.controller('MainController', ['$scope', function ($scope) {
  $scope.title = 'title';
  $scope.sortType = 'price';
  $scope.sortReverse = true;
  window.MY_SCOPE = $scope;
  $scope.uploadList = function() {
    var f = document.getElementById('uploadList').files[0];
    var  r = new FileReader();

    r.onloadend = function(e) {
      var data = JSON.parse(e.target.result);
      data.forEach(function (product) {
        if (product.quantity !== 0) {
          $scope.products.push(product);
        }
        $scope.$apply();
      });
    }

    r.readAsBinaryString(f);
  }
  $scope.cart = [];
  $scope.products = [{
      name: 'Cheese',
      price: 2.18,
      lbdate: new Date('2017', '0', '29'),
      quantity: 6,
      supermarket: 'Aldi',
      get total() {
        return (this.quantity * this.price).toFixed(2);
      },
      get totalwithcurrency() {
        return "€ " + this.total;
      }
    },
    {
      name: 'Tuna fish',
      price: 1.99,
      lbdate: new Date('2017', '0', '29'),
      quantity: 6,
      supermarket: 'Lidl',
      get total() {
        return (this.quantity * this.price).toFixed(2);
      },
      get totalwithcurrency() {
        return "€ " + this.total;
      }
    },
    {
      name: 'Spinach',
      price: 0.48,
      lbdate: new Date('2017', '10', '22'),
      quantity: 2,
      supermarket: 'Amazon',
      get total() {
        return (this.quantity * this.price).toFixed(2);
      },
      get totalwithcurrency() {
        return "€ " + this.total;
      }
    },
    {
      name: 'Milk',
      price: 0.65,
      lbdate: new Date('2017', '10', '24'),
      quantity: 3,
      supermarket: 'Lidl',
      get total() {
        return (this.quantity * this.price).toFixed(2);
      },
      get totalwithcurrency() {
        return "€ " + this.total;
      }
    },
    {
      name: 'chiken',
      price: 4,
      lbdate: new Date('2017', '10', '22'),
      quantity: 5,
      supermarket: 'Aldi',
      get total() {
        return (this.quantity * this.price).toFixed(2);
      },
      get totalwithcurrency() {
        return "€ " + this.total;
      }
    },
  ];  
  $scope.plusOne = function (item) {
    item.quantity += 1;
    item.total = item.quantity * item.price;
    item.totalwithcurrency = "€ " + item.total;
  };
  $scope.minusOne = function (item) {
    item.quantity -= 1;
    item.total = item.quantity * item.price;
    item.totalwithcurrency = "€ " + item.total;
  };
  $scope.ProductsFinished = function () {
    var count = 0;
    $scope.products.forEach(function (product) {
      if (product.quantity === 0) {
        count++;
      }
    });
    return count === $scope.products.length ? true : false;
  }
  $scope.moveToCart = function (item) {
    item.total = (item.quantity * item.price).toFixed(2);
    item.totalwithcurrency = "€" + item.total;
    item.lbdate = new Date();
    var item2 = Object.assign({}, item);
    $scope.cart.push(item2);
    $scope.totalInCart();
    $scope.removeItem(item);
    item = null;
  }
  $scope.removeItem = function (product) {
    product.quantity=0;
  }
  $scope.addToList = function () {
    if ($scope.product) {
      $scope.product.total = ($scope.product.quantity * $scope.product.price).toFixed(2);
      $scope.product.totalwithcurrency = "€" + $scope.product.total;
      $scope.product.lbdate = new Date();
      $scope.products.push($scope.product);
      $scope.product = null;
    }
  };
  $scope.totalForList = function () {
    var total = 0;
    $scope.products.forEach(function (product) {
      if (product.quantity !== 0) {
        total += (product.quantity * product.price);
      }
    });
    return "€ " + total.toFixed(2);
  }
  $scope.totalInCart = function () {
    var total = 0;
    $scope.cart.forEach(function (product) {
      if (product.quantity !== 0) {
        total += (product.quantity * product.price);
      }
    });
    return "€ " + total.toFixed(2);
  }
  $scope.saveList = function () {
    $scope.toJSON = '';
    $scope.toJSON = JSON.stringify($scope.products, null, '\t');
    var blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });	
    var currentDay = $scope.today();
    var downloadLink = angular.element('<a></a>');
                      downloadLink.attr('href',window.URL.createObjectURL(blob));
                      downloadLink.attr('download', 'list_'+currentDay+'.json');
    downloadLink[0].click();
  };
  $scope.today = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
  };
}]);