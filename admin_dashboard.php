<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header('Location: admin_login.php');
    exit;
}
require_once __DIR__ . '/db.php';

// Simple search by name/email/program
$query = $_GET['q'] ?? '';
$where = '';
$params = [];
if ($query !== '') {
    $like = '%' . $db->real_escape_string($query) . '%';
    $where = "WHERE first_name LIKE '$like' OR last_name LIKE '$like' OR email LIKE '$like' OR program LIKE '$like'";
}

$result = $db->query("SELECT * FROM applications $where ORDER BY created_at DESC LIMIT 500");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    .table-responsive { max-height: 70vh; }
    .photo-thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 4px; }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Admin</a>
      <div class="d-flex">
        <form class="d-flex me-3" method="GET">
          <input class="form-control" type="search" placeholder="Search name/email/program" name="q" value="<?php echo htmlspecialchars($query); ?>" />
          <button class="btn btn-light ms-2" type="submit">Search</button>
        </form>
        <a class="btn btn-outline-light" href="logout.php">Logout</a>
      </div>
    </div>
  </nav>

  <div class="container-fluid py-4">
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Program</th>
            <th>Level</th>
            <th>City</th>
            <th>Country</th>
            <th>GPA</th>
            
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <?php while ($row = $result->fetch_assoc()): ?>
          <tr>
            <td><?php echo (int)$row['id']; ?></td>
            
            <td><?php echo htmlspecialchars($row['first_name'] . ' ' . $row['last_name']); ?></td>
            <td><a href="mailto:<?php echo htmlspecialchars($row['email']); ?>"><?php echo htmlspecialchars($row['email']); ?></a></td>
            <td><?php echo htmlspecialchars($row['phone']); ?></td>
            <td><?php echo htmlspecialchars($row['date_of_birth']); ?></td>
            <td><?php echo htmlspecialchars($row['gender']); ?></td>
            <td><?php echo htmlspecialchars(strtoupper($row['program'])); ?></td>
            <td><?php echo htmlspecialchars(ucfirst($row['level'])); ?></td>
            <td><?php echo htmlspecialchars($row['city']); ?></td>
            <td><?php echo htmlspecialchars($row['country']); ?></td>
            <td><?php echo htmlspecialchars($row['gpa']); ?></td>
            
            <td><?php echo htmlspecialchars($row['created_at']); ?></td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>

</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</html>

