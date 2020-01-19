window.mainPage = {

    API_BASE_URL: "http://localhost:8086/nations-match",

    getUsers: function () {
        $.ajax({
            url: mainPage.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            mainPage.display(response.content);
        })

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

    display: function (users) {
        var usersHtml = "";

        users.forEach(user => usersHtml += mainPage.getUsersHtml(user));

        $(".info #User tbody").html(usersHtml);
    },
};
mainPage.getUsers();