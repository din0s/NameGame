var startTimeout = 750
var codeLength = 6

$(".refresh").click(() => {
    location.reload()
})

$(".main-btn").click(() => {
    $(".start-btns").addClass("swipe")
    setTimeout(() => {
        $(".start-btns").css({ "display": "none" })
    }, startTimeout)
})

$(".host-btn").click(() => {
    $.get("/new-lobby", data => {
        $(".code").text(data.code).focus()
    })

    setTimeout(() => {
        $(".host-menu")
            .addClass("jump")
            .css("display", "block")
    }, startTimeout)
})

$(".join-btn").click(() => {
    setTimeout(() => {
        $(".join-menu")
            .addClass("jump")
            .css("display", "block")

        $(".code-input").focus()
    }, startTimeout)
})

function joinLobby(form) {
    const input = $(".code-input")
    $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success: res => {
            if (res.success) {
                input.addClass("success")
                    .prop("disabled", true)

                $(".code-submit").addClass("hide")

            } else {
                if (input.hasClass("fail")) {
                    input.removeClass("fail")
                    setTimeout(() => {
                        input.addClass("fail")
                    }, 300)
                } else {
                    input.addClass("fail")
                }
            }
        }
    })
}

$(".code-input").on("input", event => {
    const $this = $(event.currentTarget)
    const form = $this.parent()
    const code = $this[0].value
    if (code.length > codeLength) {
        $this.addClass("fail")
    } else if (code.length < codeLength) {
        $this.removeClass("fail")
    } else {
        joinLobby(form)
    }
})

$(".join-menu form").submit(event => {
    event.preventDefault()
    joinLobby($(event.currentTarget))
    $(".code-submit").blur()
})
