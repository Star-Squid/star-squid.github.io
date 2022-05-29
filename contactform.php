<?php

if (isset($_POST)['Submit']) {
    $subject = $_POST['Reason'];
    $name = $_POST['Name'];
    $mailFrom = $_POST['Email'];
    $message = $_POST['Message'];
    $human = $_POST['Human'];

        $mailTo = "barbara@mb-malta.co.uk";
        $headers = "From portfolio: ".$mailFrom;
        $txt = "Email from ".$name."./n/n".$message;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.php?mailsend")
}

       

// Reason
// Name
// Email
// Message
// Human
// Submit