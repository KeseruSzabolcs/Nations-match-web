window.mainPage = {

    API_BASE_URL: "http://localhost:8086/nations-match",

    getUsers: function () {
        $.ajax({
            url: mainPage.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            mainPage.display(response.content);
            //mainPage.displayMainUser(response.content)
        })

    },

    display: function (users) {
        var usersHtml = "";

        users.splice(mainPage.findUser(users, 5),1);

        users.forEach(user => usersHtml += mainPage.getUsersHtml(user));

        $(".info #User tbody").html(usersHtml);
    },

    getUsersHtml: function (user) {
        return `<tr>
                    <td><img src=${user.imageUrl} alt="" border=3 height=100 width=100></td>
                    <td align="center">${user.firstName}<br>${user.lastName}</td>
                    <td align="center">${user.nationality}</td>
                    <td>${user.description}</td>
                    <td align="center">Age:<br>${user.age}<br>Email:<br>${user.email}</td>
                    <td align="center">
                         <a href="#" class="message-user" data-id="${user.id}"><i class="fas fa-paper-plane" style="font-size: 2.0em"></i></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="6"><div class="line"></div></td>
                </tr>`
    },

    getMainUser: function () {
        $.ajax({
            url: mainPage.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response.content);

            mainPage.displayMainUser(response.content);
        })

    },

    displayMainUser: function (user) {

        let usersHtml = mainPage.getMainUserHtml(user[mainPage.findUser(user, 5)]);
        console.log(usersHtml);
        $(".info #Personal tbody").html(usersHtml);
    },

    findUser: function(user, title){
        const index = user.findIndex(function (user) {
            return (user.id) === title;
        });
        return index;
    },

    getMainUserHtml: function (user) {
        return `<tr>
                    <td><img src=${user.imageUrl} alt="" border=3 height=100 width=100></td>
                    <td align="center" contenteditable="true"><div id="firstName">${user.firstName}</div><br><div id="lastName">${user.lastName}</div></td>
                    <td align="center" contenteditable="true" id="nationality">${user.nationality}</td>
                    <td contenteditable="true" id="description">${user.description}</td>
                    <td align="center">Age:<br><div contenteditable="true" id="age">${user.age}</div><br>Email:<br><div contenteditable="true" id="email">${user.email}</div></td>
                    <td align="center"><a href="#" class="delete-item"><center><i class="far fa-trash-alt" 
                                            style="font-size: 2.0em"></i></center></a><br>
                                       <a href="#" class="edit-item" data-id="${user.id}"><i class="fas fa-user-edit" 
                                            style="font-size: 2.0em"></i></a>
                    </a></td>
                </tr>
                <tr>
                    <td colspan="6"><div class="line"></div></td>
                </tr>`


    },

    updateContact: function(id, firstName, lastName, age, description, nationality, imageUrl, email){
        let requestBody = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            description: description,
            nationality: nationality,
            imageUrl:imageUrl,
            email: email
        };

        $.ajax({
            url: mainPage.API_BASE_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            mainPage.getMainUser();
            mainPage.getUsers()
        })
    },

    bindEvents: function () {
        $(".info #Personal").delegate("edit-item", "change", function (event) {
            event.preventDefault();

            const personal = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                age: $('#age').val(),
                description: $('#description').val(),
                nationality: $('#nationality').val(),
                imageUrl: $('#imageUrl').val(),
                email: $('#email').val
            };

            let id = $(this).data("id");

            mainPage.updateContact(id, personal.firstName, personal.lastName, personal.age,
                personal.description, personal.nationality, personal.imageUrl, personal.email)
        });
    }
};
mainPage.getMainUser();
mainPage.getUsers();
mainPage.bindEvents();
