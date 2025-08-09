<?php
session_start();
require_once __DIR__ . '/db.php';

function sanitize(string $value): string {
    return trim($value);
}

// Upload handling removed

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: registration.html');
    exit;
}

// Required fields
$required = [
    'firstName','lastName','email','phone','dateOfBirth','gender','address','city','postalCode','country','nationality','program','level'
];
foreach ($required as $field) {
    if (!isset($_POST[$field]) || trim($_POST[$field]) === '') {
        http_response_code(400);
        die('Missing required field: ' . htmlspecialchars($field));
    }
}

// Collect and sanitize
$firstName = sanitize($_POST['firstName']);
$lastName = sanitize($_POST['lastName']);
$email = sanitize($_POST['email']);
$phone = sanitize($_POST['phone']);
$dob = sanitize($_POST['dateOfBirth']);
$gender = sanitize($_POST['gender']);
$address = sanitize($_POST['address']);
$city = sanitize($_POST['city']);
$postalCode = sanitize($_POST['postalCode']);
$country = sanitize($_POST['country']);
$nationality = sanitize($_POST['nationality']);
$program = sanitize($_POST['program']);
$level = sanitize($_POST['level']);
$previousInstitution = isset($_POST['previousInstitution']) ? sanitize($_POST['previousInstitution']) : null;
$gpa = isset($_POST['gpa']) && $_POST['gpa'] !== '' ? (float)$_POST['gpa'] : null;
$newsletter = isset($_POST['newsletter']) ? 1 : 0;

// No file uploads
$photoPath = null;
$transcriptPath = null;
$certificatePath = null;
$cvPath = null;

// Insert into DB (uploads removed)
$stmt = $db->prepare('INSERT INTO applications (
    first_name,last_name,email,phone,date_of_birth,gender,address,city,postal_code,country,nationality,program,level,previous_institution,gpa,wants_newsletter
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');

$types = str_repeat('s', 14) . 'di';
$stmt->bind_param(
    $types,
    $firstName,
    $lastName,
    $email,
    $phone,
    $dob,
    $gender,
    $address,
    $city,
    $postalCode,
    $country,
    $nationality,
    $program,
    $level,
    $previousInstitution,
    $gpa,
    $newsletter
);

$stmt->execute();
$applicationId = $stmt->insert_id;

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application Submitted</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="alert alert-success">
          <h4 class="alert-heading">Application submitted successfully!</h4>
          <p>Your application ID is: <strong><?php echo htmlspecialchars((string)$applicationId); ?></strong></p>
          <hr />
          <p class="mb-0">
            <a class="btn btn-primary" href="registration.html">Submit another</a>
            <a class="btn btn-outline-secondary" href="index.html">Back to Home</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

