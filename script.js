$(function () {
    let data = [];

    data.push(
        {
            firstName: "Harry",
            lastName: "Potter"
        }, {
        firstName: "Kapitán",
        lastName: "Amerika"
    }, {
        firstName: "Tony",
        lastName: "Stark"
    }, {
        firstName: "Bruce",
        lastName: "Benner"
    }, {
        firstName: "Tony",
        lastName: "Hawk"
    }, {
        firstName: "Dwayen",
        lastName: "Jhonson"
    }, {
        firstName: "Harry",
        lastName: "Winters"
    }
    );


    //add persons to div
    let listUsers = $(".list-users");

    let i;
    let count = data.length;
    let row;

    for (i = 0; i < count; ++i) {
        row = data[i];

        listUsers.append(
            $('<div class="user-item">').append(
                $('<div class="user-firstname">').html(row.firstName),
                $('<div class="user-lastname">').html(row.lastName),
            )
        );
    }


    //check empty field
    function checkEmpty() {
        let personFields = $(".person-fields");
        let hasError = false;

        personFields.each(function () {
            let input = $(this).find("input");

            if (input.val() == 0) {
                input.addClass("red");
                hasError = true;
            } else if (input.val() != 0) {
                input.removeClass("red");
            }
        })

        if (hasError) {
            return false;
        } else {
            return true;
        }
    }


    //add user
    function submitCheckEmpty() {
        if (checkEmpty()) {
            addUserSubmit();
            $("input").val("");
        }
    }

    $(".add-button").on("click", function (event) {
        submitCheckEmpty();
        event.preventDefault();
    })

    //add new user
    function addUserSubmit() {
        let addFirstName = $(".name").val();
        let addLastname = $(".lastname").val();
        $(".user-item").remove();
        data.push({
            firstName: addFirstName,
            lastName: addLastname
        });


        //add persons to div
        let listUsers = $(".list-users");

        let i;
        let count = data.length;
        let row;

        for (i = 0; i < count; ++i) {
            row = data[i];

            listUsers.append(
                $('<div class="user-item">').append(
                    $('<div class="user-firstname">').html(row.firstName),
                    $('<div class="user-lastname">').html(row.lastName),
                )
            );
        }

    }


    //searching
    function search() {
        let searchField = $(".search-field");
        let listUser = $(".list-users");
        let userItem = $(".user-item");
        let searchLabel = $(".person-fields label").addClass("gray");

        let disable = {
            input: $(".add-button").prop("disabled", true),
            addFirstName: $(".name").prop("disabled", true),
            addLastname: $(".lastname").prop("disabled", true),
            sort: $(".sort").prop("disabled", true)
        }

        $(".user-item").remove();

        userItem.each(function () {
            let searchPerson = {
                firstName: $(this).find(".user-firstname").text(),
                lastName: $(this).find(".user-lastname").text()
            }

            let completeName = searchPerson.firstName + " " + searchPerson.lastName;

            if (searchField.val() === searchPerson.firstName) {
                $(this).appendTo(listUser);
            } else if (searchField.val() === searchPerson.lastName) {
                $(this).appendTo(listUser);
            } else if (searchField.val() === completeName) {
                $(this).appendTo(listUser);
            }

        })
    }



    //check empty search field
    function checkEmptySearch() {
        let input = $(".search-field");
        let hasError = false;

        if (input.val() == 0) {
            input.addClass("red");
            hasError = true;
        } else if (input.val() != 0) {
            input.removeClass("red");
        }

        if (hasError) {
            return false;
        } else {
            return true;
        }
    }


    //add user
    function searchCheckEmpty() {
        if (checkEmptySearch()) {
            search();
            $("input").val("");
        }
    }




    $(".search").on("click", function (event) {
        searchCheckEmpty();

        //if empty field
        function isEmpty(el) {
            return !$.trim(el.html())
        }

        let infoError = $("<div/>").addClass("info-error").text("Je nám líto, uživatel nenalezen.");
        if (isEmpty($('.list-users'))) {
            infoError.appendTo($(".list-users"))
        }

        event.preventDefault();
    })


    //sort
    function sort() {
        let searchField = $(".search-field");
        let userItem = $(".user-item");

        userItem.remove();
        data.sort(function (a, b) {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                return -1
            } else if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })

        let i;
        let count = data.length;
        let row;
        for (i = 0; i < count; ++i) {
            row = data[i];

            listUsers.append(
                $('<div class="user-item">').append(
                    $('<div class="user-firstname">').html(row.firstName),
                    $('<div class="user-lastname">').html(row.lastName),
                )
            );
        }

    }

    $(".sort").on("click", function (event) {
        sort();
        event.preventDefault();
    })


    //cancel
    $(".restart-search").on("click", function (event) {
        location.reload(true);
        event.preventDefault();
    })

});