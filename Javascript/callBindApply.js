let name = {
    firstName: "Lakshmikanth",
    lastName: "Reddy"
}

let printFullName = function(city, state) {
    console.log(this.firstName + ' ' + this.lastName + ' from ' + city + ',' + state );
}

printFullName.call(name, 'Hyderabad', 'Telangana');

let name2 = {
    firstName: "Raghu",
    lastName: "Reddy"
};

printFullName.call(name2, 'Bangalore', 'Karnataka');

printFullName.apply(name2, ['Kochi', 'Kerala']);

let details = printFullName.bind(name2, ['Chennai', 'Tamilnadu']);

details();