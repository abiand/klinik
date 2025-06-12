const pegawaiModel = require('../Models/pegawai');

exports.getAllPegawai = async (req, res) => {
  try {
    const pegawaiList = await pegawaiModel.getAllPegawai();

    // Render with EJS (if using views)
   // res.render('pegawaiList', { pegawaiList }); // adjust view name if needed

    // OR return JSON (for REST API)
     res.json(pegawaiList);
  } catch (error) {
    console.error('Error fetching pegawai:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.submitPegawai = async (req, res) => {
  try {
  console.log("🔥 /submit-request hit");
  console.log("📦 req.body:", req.body);
     const data = {
 // idpegawai: req.body['req_idpegawai'],
  nik: req.body['req_nik'],
  nama: req.body['req_nama'],
  namabelakang: req.body['req_namabelakang'],
  tempat: req.body['req_tempat'],
  tgllahir: req.body['req_tgllahir'],
  alamat: req.body['req_alamat'],
  provinsi: req.body['req_provinsi'],
  kota: req.body['req_kota'],
  kecamatan: req.body['req_kecamatan'],
  desa: req.body['req_desa'],
  jeniskelamin: req.body['req_jeniskelamin'],
  wniwna: req.body['req_wniwna'],
  goldarah: req.body['req_goldarah'],
  status: req.body['req_status'],
  kantor: req.body['req_kantor'],
  agama: req.body['req_agama'],
  notelp: req.body['req_notelp'],
  email: req.body['req_email'],
  pendidikan: req.body['req_pendidikan'],
alumni: req.body['req_alumni'],
tahunlulus: req.body['req_tahunlulus'],
jurusan: req.body['req_jurusan'],
jabatan: req.body['req_jabatan'],
department: req.body['req_department'],
mulaikontrak: req.body['req_mulaikontrak'],
mulaibekerja: req.body['req_mulaibekerja'],
statuspegawai: req.body['req_statuspegawai'],
jumlahcuti: req.body['req_jumlahcuti'],
daruratnama: req.body['req_daruratnama'],
darurathubungan: req.body['req_darurathubungan'],
daruratnotelp: req.body['req_daruratnotelp'],
honorarium: req.body['req_honorarium']
};
const honorariumArr = JSON.parse(data.honorarium || "[]");

 console.log("✅ Data to insert:", data);
    await pegawaiModel.insertPegawai(data, honorariumArr);
    //res.redirect('/success-page'); // or ren   der a view / send JSON
    res.json({ success: true }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to submit request.');
  }
};
