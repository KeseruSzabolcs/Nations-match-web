window.loginPage = {

    API_BASE_URL: "http://localhost:8086/nations-match",

    getUsers: function () {
        $.ajax({
            url: loginPage.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            //console.log(response.content.length);
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            for (let i = 0; i<response.content.length; i++){
                if(username == response.content[i].email && password == response.content[i].password){
                    console.log(response.content[i].id);

                    //action="http://localhost:63342/nations-match-web/home.html"
                }
            }
        })

    }
};
loginPage.getUsers();