document.addEventListener('DOMContentLoaded', function() {
  // Bagian: Welcome Name di Home Page
  if(document.getElementById('user-name')) {
    let storedName = localStorage.getItem('userName');
    if (!storedName) {
      storedName = prompt("Masukkan nama Anda:");
      if (storedName && storedName.trim() !== "") {
        localStorage.setItem('userName', storedName);
      } else {
        storedName = "Tamu";
      }
    }
    document.getElementById('user-name').textContent = storedName;
    // Isi otomatis field nama di form jika ada
    if(document.getElementById('name-input')) {
      document.getElementById('name-input').value = storedName;
    }
  }

  // Bagian: Form Message Us
  const form = document.getElementById('messageForm');
  if(form){
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Ambil nilai input
      const name = document.getElementById('name-input').value.trim();
      const dob = document.getElementById('dob').value;
      const gender = document.querySelector('input[name="gender"]:checked');
      const message = document.getElementById('message').value.trim();

      // Validasi sederhana
      if (!name || !dob || !gender || !message) {
        alert('Semua field harus diisi!');
        return;
      }

      // Format tanggal (dd/mm/yyyy)
      let dobFormatted = "";
      if (dob) {
        const arr = dob.split('-');
        if(arr.length === 3) {
          dobFormatted = arr[2] + '/' + arr[1] + '/' + arr[0];
        }
      }

      // Waktu saat ini (format lokal Indonesia)
      const now = new Date();
      const timeString = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

      // Tampilkan hasil di kolom kanan
      document.getElementById('messageResult').innerHTML = `
        <b>Current time :</b> ${timeString}<br><br>
        <b>Nama :</b> ${name}<br>
        <b>Tanggal Lahir :</b> ${dobFormatted}<br>
        <b>Jenis Kelamin :</b> ${gender.value}<br>
        <b>Pesan :</b> ${message}
      `;
    });
  }
});
