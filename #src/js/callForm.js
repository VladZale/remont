;(function () {
    "use strict"
    
    document.addEventListener('DOMContentLoaded', function() {
        const call = document.getElementById('call');
        call.addEventListener('submit', formSend);
    
        async function formSend(e) {
            e.preventDefault();
    
            let error = formValidate(call);
    
            let formData = new FormData(form);
    
            if (error === 0) {
                call.classList.add('_sending');
                alert("Some popup...");
                let response = await fetch('sendmail.php',{
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    call.reset();
                    call.classList.remove('_sending');
                }else{
                    alert("Some popup...");
                    call.classList.remove('_sending')
                }
            }else{
                alert('Заполните обязательные поля');
            }
        }
    
        function formValidate(call) {
            let error = 0;
            let formReq = document.querySelectorAll('._reqC');
    
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);
        
                if (input.classList.contains('_email')) {
                        if (emailTest(input)) {
                            formAddError(input);
                            error++;
                        }
                }else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                }else{
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
        
            }
            return error;
        }
    
        function formAddError(input) {
           input.parentElement.classList.add('_error');
           input.classList.add('_error');
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }
    });
})();