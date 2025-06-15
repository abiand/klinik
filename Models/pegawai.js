const { poolPromise  } = require('../Config/mydb');
/*
module.exports = {
  // READ: Get all

    getAllPegawai: async () => {
   // await poolConnect;
    const [rows] = await poolPromise.query('SELECT * FROM kepegawaian');
    return rows;
  }
}*/


async function getAllPegawai() {
  const [rows] = await poolPromise.query('SELECT * FROM kepegawaian');
  return rows;
}

async function insertPegawai(data, honorariumArr) {
 // await poolConnect;
  //const request = poolPromise.request();

    //const pool = await poolPromise;
  //const request = pool.request();

/*request.input('idpegawai', data.idpegawai);
request.input('nik', data.nik);
request.input('nama', data.nama);
request.input('namabelakang', data.namabelakang);
request.input('tempat', data.tempat);
request.input('tgllahir', data.tgllahir);
request.input('alamat', data.alamat);
request.input('provinsi', data.provinsi);
request.input('kota', data.kota);
request.input('kecamatan', data.kecamatan);
request.input('desa', data.desa);
request.input('jeniskelamin', data.jeniskelamin);
request.input('wniwna', data.wniwna);
request.input('goldarah', data.goldarah);
request.input('status', data.status);
request.input('kantor', data.kantor);
request.input('agama', data.agama);
request.input('notelp', data.notelp);
request.input('email', data.email);*/

//console.log('Inserting Pegawai with data:', data);

const sqlQuery = `
  INSERT INTO kepegawaian (
    nik,
    nama,
    nama_belakang,
    tempat_lahir,
    tgl_lahir,
    alamat,
    propinsi,
    kota,
    kecamatan,
    desa,
    jenis_kelamin,
    kewarganegaraan,
    golongan_darah,
    status,
    agama,
    telepon,
    email,
    pendidikan,
    alumni,
    tahunlulus,
    jurusan,
    jabatan_id,
    department,
    mulai_kontrak,
    mulai_bekerja,
    status_pegawai,
    jumlah_cuti,
    nama_kontak_darurat,
    hubungan,
    no_telp_darurat,
    photo_path      
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`;

  console.log('Running SQL:', sqlQuery);
    //console.log('With values:', [data.nik, data.nama]);
  //const [result] = await poolPromise.query(sqlQuery, [data.nik, data.nama]);
const [result] = await poolPromise.query(sqlQuery, [
  data.nik,
  data.nama,
  data.namabelakang,
  data.tempat,
  data.tgllahir,
  data.alamat,
  data.provinsi,
  data.kota,
  data.kecamatan,
  data.desa,
  data.jeniskelamin,
  data.wniwna,
  data.goldarah,
  data.status,
  data.agama,
  data.notelp,
  data.email,
  data.pendidikan,
  data.alumni,
  data.tahunlulus,
  data.jurusan,
  data.jabatan,
  data.department,
  data.mulaikontrak,
  data.mulaibekerja,
  data.statuspegawai,
  data.jumlahcuti,
  data.daruratnama,
  data.darurathubungan,
  data.daruratnotelp,
  data.photo_path    
]);
 const pegawaiId = result.insertId;
  if (honorariumArr && honorariumArr.length > 0) {
    const honorariumSql = `
      INSERT INTO honorarium (pegawai_id, type, nominal, jumlah)
      VALUES (?, ?, ?, ?)
    `;
    for (const row of honorariumArr) {
      await poolPromise.query(honorariumSql, [
        pegawaiId,
        row.tipe,
        row.nominal,
        row.jumlah
      ]);
    }
  }

  //console.log('Insert result:', result);  
  return result;
}

module.exports = { getAllPegawai, insertPegawai};