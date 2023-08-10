$(document).ready(function () {
    // Define spinner handling function
    function handleSpinner(visibility) {
        if (visibility === 'show') {
            $('#loading').show()
        } else if (visibility === 'hide') {
            $('#loading').hide()
        } else {
            console.error(
                "Invalid visibility option. Use either 'show' or 'hide'."
            )
        }
    }

    // Hide the loading spinner on page load
    handleSpinner('hide')

    $('#coverLetterForm').on('submit', function (e) {
        e.preventDefault()

        // Show the loading spinner
        handleSpinner('show')

        // Prepare form data
        let formData = $(this).serialize()

        // AJAX POST request
        $.ajax({
            type: 'POST',
            url: '/generate',
            data: formData,
            success: function (response) {
                // Hide the loading spinner
                handleSpinner('hide')

                // Clear the existing text
                $('#coverLetterText').html('')

                // Type the new text
                new TypeIt('#coverLetterText', {
                    strings: response.cover_letter,
                    speed: 25,
                    cursor: false,
                }).go()
            },
            error: function (error) {
                console.error('Error:', error)

                // Hide the loading spinner
                handleSpinner('hide')
            },
        })
    })
})
