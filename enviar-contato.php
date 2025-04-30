<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Captura e sanitiza dados do formulário
$nome     = filter_input(INPUT_POST, 'nome',     FILTER_SANITIZE_STRING);
$email    = filter_input(INPUT_POST, 'email',    FILTER_VALIDATE_EMAIL);
$assunto  = filter_input(INPUT_POST, 'assunto',  FILTER_SANITIZE_STRING);
$mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING);

if (!$email) {
    die('E-mail inválido.');
}

$mail = new PHPMailer(true);

try {
    // Configurações do servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.seuprovedor.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'seu_usuario@smtp.com';
    $mail->Password   = 'sua_senha';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ou PHPMailer::ENCRYPTION_SMTPS
    $mail->Port       = 587;

    // Remetente e destinatário
    $mail->setFrom('no-reply@seudominio.com', 'Site Fale Conosco');
    $mail->addAddress('seuemail@exemplo.com', 'Seu Nome ou Empresa');

    // Responder para quem enviou
    $mail->addReplyTo($email, $nome);

    // Conteúdo do e-mail
    $mail->isHTML(false);
    $mail->Subject = "[Contato] $assunto";
    $body  = "Você recebeu uma nova mensagem de contato:\n\n";
    $body .= "Nome: $nome\n";
    $body .= "E-mail: $email\n";
    $body .= "Assunto: $assunto\n\n";
    $body .= "Mensagem:\n$mensagem\n";
    $mail->Body = $body;

    $mail->send();
    echo '<p>Obrigado, sua mensagem foi enviada com sucesso!</p>';
} catch (Exception $e) {
    echo "<p>Falha ao enviar mensagem: {$mail->ErrorInfo}</p>";
}
?>
