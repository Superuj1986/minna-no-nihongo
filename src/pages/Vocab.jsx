import { useState, useCallback } from "react";

const VOCAB = [
  // ================== BÀI 1 ==================
  { id:1,  lesson:1, jp:"わたし",         meaning:"tôi" },
  { id:2,  lesson:1, jp:"あなた",         meaning:"anh/chị" },
  { id:3,  lesson:1, jp:"あのひと",       meaning:"người kia" },
  { id:4,  lesson:1, jp:"〜さん",         meaning:"anh/chị/ông/bà" },
  { id:5,  lesson:1, jp:"〜ちゃん",       meaning:"hậu tố thân mật cho trẻ em" },
  { id:6,  lesson:1, jp:"〜じん",         meaning:"người (quốc tịch)" },
  { id:7,  lesson:1, jp:"せんせい",       meaning:"thầy/cô giáo" },
  { id:8,  lesson:1, jp:"きょうし",       meaning:"giáo viên" },
  { id:9,  lesson:1, jp:"がくせい",       meaning:"sinh viên, học sinh" },
  { id:10, lesson:1, jp:"かいしゃいん",   meaning:"nhân viên công ty" },
  { id:11, lesson:1, jp:"ぎんこういん",   meaning:"nhân viên ngân hàng" },
  { id:12, lesson:1, jp:"いしゃ",         meaning:"bác sĩ" },
  { id:13, lesson:1, jp:"けんきゅうしゃ", meaning:"nhà nghiên cứu" },
  { id:14, lesson:1, jp:"だいがく",       meaning:"đại học" },
  { id:15, lesson:1, jp:"びょういん",     meaning:"bệnh viện" },
  { id:16, lesson:1, jp:"〜さい",         meaning:"... tuổi" },
  { id:17, lesson:1, jp:"なんさい",       meaning:"mấy tuổi" },
  { id:18, lesson:1, jp:"はい",           meaning:"vâng" },
  { id:19, lesson:1, jp:"いいえ",         meaning:"không" },

  // ================== BÀI 2 ==================
  { id:20, lesson:2, jp:"これ",           meaning:"cái này" },
  { id:21, lesson:2, jp:"それ",           meaning:"cái đó" },
  { id:22, lesson:2, jp:"あれ",           meaning:"cái kia" },
  { id:23, lesson:2, jp:"この〜",         meaning:"... này" },
  { id:24, lesson:2, jp:"その〜",         meaning:"... đó" },
  { id:25, lesson:2, jp:"あの〜",         meaning:"... kia" },
  { id:26, lesson:2, jp:"ほん",           meaning:"sách" },
  { id:27, lesson:2, jp:"じしょ",         meaning:"từ điển" },
  { id:28, lesson:2, jp:"ざっし",         meaning:"tạp chí" },
  { id:29, lesson:2, jp:"しんぶん",       meaning:"báo" },
  { id:30, lesson:2, jp:"ノート",         meaning:"vở" },
  { id:31, lesson:2, jp:"てちょう",       meaning:"sổ tay" },
  { id:32, lesson:2, jp:"めいし",         meaning:"danh thiếp" },
  { id:33, lesson:2, jp:"カード",         meaning:"thẻ" },
  { id:34, lesson:2, jp:"えんぴつ",       meaning:"bút chì" },
  { id:35, lesson:2, jp:"ボールペン",     meaning:"bút bi" },
  { id:36, lesson:2, jp:"シャープペンシル", meaning:"bút chì kim" },
  { id:37, lesson:2, jp:"かぎ",           meaning:"chìa khóa" },
  { id:38, lesson:2, jp:"とけい",         meaning:"đồng hồ" },
  { id:39, lesson:2, jp:"かさ",           meaning:"ô, dù" },
  { id:40, lesson:2, jp:"かばん",         meaning:"cặp, túi" },
  { id:41, lesson:2, jp:"テレビ",         meaning:"ti vi" },
  { id:42, lesson:2, jp:"ラジオ",         meaning:"radio" },
  { id:43, lesson:2, jp:"カメラ",         meaning:"máy ảnh" },
  { id:44, lesson:2, jp:"パソコン",       meaning:"máy tính" },
  { id:45, lesson:2, jp:"くるま",         meaning:"xe hơi" },
  { id:46, lesson:2, jp:"つくえ",         meaning:"bàn" },
  { id:47, lesson:2, jp:"いす",           meaning:"ghế" },
  { id:48, lesson:2, jp:"チョコレート",   meaning:"sô cô la" },
  { id:49, lesson:2, jp:"コーヒー",       meaning:"cà phê" },

  // ================== BÀI 3 ==================
  { id:50, lesson:3, jp:"ここ",           meaning:"đây" },
  { id:51, lesson:3, jp:"そこ",           meaning:"đó" },
  { id:52, lesson:3, jp:"あそこ",         meaning:"kia" },
  { id:53, lesson:3, jp:"どこ",           meaning:"đâu" },
  { id:54, lesson:3, jp:"こちら",         meaning:"phía này" },
  { id:55, lesson:3, jp:"そちら",         meaning:"phía đó" },
  { id:56, lesson:3, jp:"あちら",         meaning:"phía kia" },
  { id:57, lesson:3, jp:"どちら",         meaning:"phía nào" },
  { id:58, lesson:3, jp:"きょうしつ",     meaning:"lớp học" },
  { id:59, lesson:3, jp:"しょくどう",     meaning:"nhà ăn" },
  { id:60, lesson:3, jp:"じむしょ",       meaning:"văn phòng" },
  { id:61, lesson:3, jp:"かいぎしつ",     meaning:"phòng họp" },
  { id:62, lesson:3, jp:"うけつけ",       meaning:"quầy tiếp tân" },
  { id:63, lesson:3, jp:"ロビー",         meaning:"sảnh" },
  { id:64, lesson:3, jp:"へや",           meaning:"phòng" },
  { id:65, lesson:3, jp:"トイレ",         meaning:"nhà vệ sinh" },
  { id:66, lesson:3, jp:"かいだん",       meaning:"cầu thang" },
  { id:67, lesson:3, jp:"エレベーター",   meaning:"thang máy" },
  { id:68, lesson:3, jp:"エスカレーター", meaning:"thang cuốn" },
  { id:69, lesson:3, jp:"じどうはんばいき", meaning:"máy bán hàng tự động" },
  { id:70, lesson:3, jp:"でんわ",         meaning:"điện thoại" },
  { id:71, lesson:3, jp:"くに",           meaning:"nước" },
  { id:72, lesson:3, jp:"かいしゃ",       meaning:"công ty" },
  { id:73, lesson:3, jp:"うち",           meaning:"nhà" },
  { id:74, lesson:3, jp:"いくら",         meaning:"bao nhiêu tiền" },
  { id:75, lesson:3, jp:"ひゃく",         meaning:"100" },
  { id:76, lesson:3, jp:"せん",           meaning:"1000" },
  { id:77, lesson:3, jp:"まん",           meaning:"10000" },

  // ================== BÀI 4 ==================
  { id:78, lesson:4, jp:"おきます",       meaning:"thức dậy" },
  { id:79, lesson:4, jp:"ねます",         meaning:"ngủ" },
  { id:80, lesson:4, jp:"はたらきます",   meaning:"làm việc" },
  { id:81, lesson:4, jp:"やすみます",     meaning:"nghỉ" },
  { id:82, lesson:4, jp:"べんきょうします", meaning:"học" },
  { id:83, lesson:4, jp:"おわります",     meaning:"kết thúc" },
  { id:84, lesson:4, jp:"デパート",       meaning:"bách hóa" },
  { id:85, lesson:4, jp:"ぎんこう",       meaning:"ngân hàng" },
  { id:86, lesson:4, jp:"ゆうびんきょく", meaning:"bưu điện" },
  { id:87, lesson:4, jp:"としょかん",     meaning:"thư viện" },
  { id:88, lesson:4, jp:"びじゅつかん",   meaning:"bảo tàng" },
  { id:89, lesson:4, jp:"いま",           meaning:"bây giờ" },
  { id:90, lesson:4, jp:"はん",           meaning:"rưỡi" },
  { id:91, lesson:4, jp:"ごぜん",         meaning:"sáng" },
  { id:92, lesson:4, jp:"ごご",           meaning:"chiều" },
  { id:93, lesson:4, jp:"あさ",           meaning:"sáng" },
  { id:94, lesson:4, jp:"ひる",           meaning:"trưa" },
  { id:95, lesson:4, jp:"よる",           meaning:"tối" },
  { id:96, lesson:4, jp:"おととい",       meaning:"hôm kia" },
  { id:97, lesson:4, jp:"きのう",         meaning:"hôm qua" },
  { id:98, lesson:4, jp:"きょう",         meaning:"hôm nay" },
  { id:99, lesson:4, jp:"あした",         meaning:"ngày mai" },
  { id:100,lesson:4, jp:"あさって",       meaning:"ngày kia" },
  { id:101,lesson:4, jp:"けさ",           meaning:"sáng nay" },
  { id:102,lesson:4, jp:"こんばん",       meaning:"tối nay" },
  { id:103,lesson:4, jp:"やすみ",         meaning:"ngày nghỉ" },
  { id:104,lesson:4, jp:"ひるやすみ",     meaning:"nghỉ trưa" },
  { id:105,lesson:4, jp:"げつようび",     meaning:"thứ Hai" },
  { id:106,lesson:4, jp:"かようび",       meaning:"thứ Ba" },
  { id:107,lesson:4, jp:"すいようび",     meaning:"thứ Tư" },
  { id:108,lesson:4, jp:"もくようび",     meaning:"thứ Năm" },
  { id:109,lesson:4, jp:"きんようび",     meaning:"thứ Sáu" },
  { id:110,lesson:4, jp:"どようび",       meaning:"thứ Bảy" },
  { id:111,lesson:4, jp:"にちようび",     meaning:"Chủ Nhật" },
  { id:112,lesson:4, jp:"なんようび",     meaning:"thứ mấy" },

  // ================== BÀI 5 ==================
  { id:113,lesson:5, jp:"いきます",       meaning:"đi" },
  { id:114,lesson:5, jp:"きます",         meaning:"đến" },
  { id:115,lesson:5, jp:"かえります",     meaning:"về" },
  { id:116,lesson:5, jp:"がっこう",       meaning:"trường học" },
  { id:117,lesson:5, jp:"スーパー",       meaning:"siêu thị" },
  { id:118,lesson:5, jp:"えき",           meaning:"ga" },
  { id:119,lesson:5, jp:"ひこうき",       meaning:"máy bay" },
  { id:120,lesson:5, jp:"ふね",           meaning:"tàu thủy" },
  { id:121,lesson:5, jp:"でんしゃ",       meaning:"tàu điện" },
  { id:122,lesson:5, jp:"ちかてつ",       meaning:"tàu điện ngầm" },
  { id:123,lesson:5, jp:"しんかんせん",   meaning:"shinkansen" },
  { id:124,lesson:5, jp:"バス",           meaning:"xe buýt" },
  { id:125,lesson:5, jp:"タクシー",       meaning:"taxi" },
  { id:126,lesson:5, jp:"じてんしゃ",     meaning:"xe đạp" },
  { id:127,lesson:5, jp:"あるいて",       meaning:"đi bộ" },
  { id:128,lesson:5, jp:"ひとり",         meaning:"một người" },
  { id:129,lesson:5, jp:"ともだち",       meaning:"bạn bè" },
  { id:130,lesson:5, jp:"かれ",           meaning:"bạn trai" },
  { id:131,lesson:5, jp:"かのじょ",       meaning:"bạn gái" },
  { id:132,lesson:5, jp:"かぞく",         meaning:"gia đình" },
  { id:133,lesson:5, jp:"ひとりで",       meaning:"một mình" },
  { id:134,lesson:5, jp:"せんしゅう",     meaning:"tuần trước" },
  { id:135,lesson:5, jp:"こんしゅう",     meaning:"tuần này" },
  { id:136,lesson:5, jp:"らいしゅう",     meaning:"tuần sau" },
  { id:137,lesson:5, jp:"せんげつ",       meaning:"tháng trước" },
  { id:138,lesson:5, jp:"こんげつ",       meaning:"tháng này" },
  { id:139,lesson:5, jp:"らいげつ",       meaning:"tháng sau" },
  { id:140,lesson:5, jp:"きょねん",       meaning:"năm ngoái" },
  { id:141,lesson:5, jp:"ことし",         meaning:"năm nay" },
  { id:142,lesson:5, jp:"らいねん",       meaning:"năm sau" },
  { id:143,lesson:5, jp:"いつ",           meaning:"khi nào" },
  { id:144,lesson:5, jp:"たんじょうび",   meaning:"sinh nhật" },

  // ================== BÀI 6 - 9 (Rút gọn một phần để code không quá dài) ==================
  // Bạn có thể copy phần này từ file cũ của bạn. Tôi giữ một số từ tiêu biểu.
  { id:145,lesson:6, jp:"たべます",       meaning:"ăn" },
  { id:146,lesson:6, jp:"のみます",       meaning:"uống" },
  { id:147,lesson:6, jp:"すいます",       meaning:"hút [thuốc lá]" },
  { id:148,lesson:6, jp:"みます",         meaning:"xem, nhìn" },
  { id:149,lesson:6, jp:"します",         meaning:"làm, chơi" },
  { id:150,lesson:6, jp:"かいます",       meaning:"mua" },
  { id:151,lesson:6, jp:"はなみ",         meaning:"ngắm hoa anh đào" },
  { id:152,lesson:6, jp:"なにか",         meaning:"cái gì đó" },
  { id:153,lesson:6, jp:"いっしょに",     meaning:"cùng, cùng nhau" },
  { id:154,lesson:6, jp:"すこし",         meaning:"một chút" },
  { id:155,lesson:6, jp:"いつも",         meaning:"luôn luôn, lúc nào cũng" },
  { id:156,lesson:6, jp:"ときどき",       meaning:"thỉnh thoảng" },
  { id:157,lesson:6, jp:"それから",       meaning:"sau đó, tiếp theo" },
  { id:158,lesson:6, jp:"テニス",         meaning:"quần vợt" },
  { id:159,lesson:6, jp:"サッカー",       meaning:"bóng đá" },
  { id:160,lesson:6, jp:"えいが",         meaning:"phim, điện ảnh" },
  { id:161,lesson:6, jp:"てがみ",         meaning:"thư" },
  { id:162,lesson:6, jp:"ビデオ",         meaning:"băng video, đầu video" },
  { id:163,lesson:6, jp:"おみやげ",       meaning:"quà (mua khi đi xa về)" },
  { id:164,lesson:6, jp:"みせ",           meaning:"cửa hàng, tiệm" },

  { id:165,lesson:7, jp:"あげます",       meaning:"cho, tặng" },
  { id:166,lesson:7, jp:"もらいます",     meaning:"nhận" },
  { id:167,lesson:7, jp:"かします",       meaning:"cho mượn, cho vay" },
  { id:168,lesson:7, jp:"かります",       meaning:"mượn, vay" },
  { id:169,lesson:7, jp:"おしえます",     meaning:"dạy" },
  { id:170,lesson:7, jp:"ならいます",     meaning:"học, tập" },
  { id:171,lesson:7, jp:"でんわをかけます", meaning:"gọi điện thoại" },
  { id:172,lesson:7, jp:"て",             meaning:"tay" },
  { id:173,lesson:7, jp:"はし",           meaning:"đũa" },
  { id:174,lesson:7, jp:"スプーン",       meaning:"thìa" },
  { id:175,lesson:7, jp:"ナイフ",         meaning:"dao" },
  { id:176,lesson:7, jp:"フォーク",       meaning:"dĩa, nĩa" },
  { id:177,lesson:7, jp:"はさみ",         meaning:"kéo" },
  { id:178,lesson:7, jp:"ケータイ",       meaning:"điện thoại di động" },
  { id:179,lesson:7, jp:"メール",         meaning:"thư điện tử, email" },
  { id:180,lesson:7, jp:"ねんがじょう",   meaning:"thiếp mừng năm mới" },
  { id:181,lesson:7, jp:"プレゼント",     meaning:"quà tặng" },
  { id:182,lesson:7, jp:"にもつ",         meaning:"đồ đạc, hành lý" },
  { id:183,lesson:7, jp:"おかね",         meaning:"tiền" },
  { id:184,lesson:7, jp:"きって",         meaning:"tem" },
  { id:185,lesson:7, jp:"クリスマス",     meaning:"Giáng sinh" },
  { id:186,lesson:7, jp:"もう",           meaning:"đã, rồi" },
  { id:187,lesson:7, jp:"まだ",           meaning:"chưa" },

  { id:188,lesson:8, jp:"きれい[な]",     meaning:"đẹp, sạch" },
  { id:189,lesson:8, jp:"しずか[な]",     meaning:"yên tĩnh" },
  { id:190,lesson:8, jp:"にぎやか[な]",   meaning:"nào nhiệt" },
  { id:191,lesson:8, jp:"ゆうめい[な]",   meaning:"nổi tiếng" },
  { id:192,lesson:8, jp:"しんせつ[な]",   meaning:"tốt bụng, thân thiện" },
  { id:193,lesson:8, jp:"げんき[な]",     meaning:"khỏe, khỏe khoắn" },
  { id:194,lesson:8, jp:"ひま[な]",       meaning:"rảnh rỗi" },
  { id:195,lesson:8, jp:"べんり[な]",     meaning:"tiện lợi" },
  { id:196,lesson:8, jp:"すてき[な]",     meaning:"đẹp, hay" },
  { id:197,lesson:8, jp:"おおきい",       meaning:"to, lớn" },
  { id:198,lesson:8, jp:"ちいさい",       meaning:"nhỏ, bé" },
  { id:199,lesson:8, jp:"あたらしい",     meaning:"mới" },
  { id:200,lesson:8, jp:"ふるい",         meaning:"cũ" },
  { id:201,lesson:8, jp:"いい",           meaning:"tốt" },
  { id:202,lesson:8, jp:"わるい",         meaning:"xấu" },
  { id:203,lesson:8, jp:"あつい",         meaning:"nóng" },
  { id:204,lesson:8, jp:"さむい",         meaning:"lạnh, rét (thời tiết)" },
  { id:205,lesson:8, jp:"つめたい",       meaning:"lạnh, buốt (cảm giác chạm)" },
  { id:206,lesson:8, jp:"むずかしい",     meaning:"khó" },
  { id:207,lesson:8, jp:"やさしい",       meaning:"dễ" },
  { id:208,lesson:8, jp:"たかい",         meaning:"đắt, cao" },
  { id:209,lesson:8, jp:"やすい",         meaning:"rẻ" },
  { id:210,lesson:8, jp:"ひくい",         meaning:"thấp" },
  { id:211,lesson:8, jp:"おいしい",       meaning:"ngon" },
  { id:212,lesson:8, jp:"いそがしい",     meaning:"bận" },
  { id:213,lesson:8, jp:"たのしい",       meaning:"vui" },
  { id:214,lesson:8, jp:"しろい",         meaning:"trắng" },
  { id:215,lesson:8, jp:"くろい",         meaning:"đen" },
  { id:216,lesson:8, jp:"あかい",         meaning:"đỏ" },
  { id:217,lesson:8, jp:"あおい",         meaning:"xanh da trời" },
  { id:218,lesson:8, jp:"さくら",         meaning:"anh đào (hoa, cây)" },
  { id:219,lesson:8, jp:"やま",           meaning:"núi" },
  { id:220,lesson:8, jp:"まち",           meaning:"thị trấn, thành phố" },
  { id:221,lesson:8, jp:"たべもの",       meaning:"đồ ăn" },
  { id:222,lesson:8, jp:"どんな",         meaning:"như thế nào, loại nào" },
  { id:223,lesson:8, jp:"そして",         meaning:"và, thêm nữa (nối hai câu)" },
  { id:224,lesson:8, jp:"でも",           meaning:"nhưng" },

  { id:225,lesson:9, jp:"わかります",     meaning:"hiểu, nắm được" },
  { id:226,lesson:9, jp:"あります",       meaning:"có (sở hữu)" },
  { id:227,lesson:9, jp:"すき[な]",       meaning:"thích" },
  { id:228,lesson:9, jp:"きらい[な]",     meaning:"ghét, không thích" },
  { id:229,lesson:9, jp:"じょうず[な]",   meaning:"giỏi, khéo" },
  { id:230,lesson:9, jp:"へた[な]",       meaning:"kém" },
  { id:231,lesson:9, jp:"のみもの",       meaning:"đồ uống" },
  { id:232,lesson:9, jp:"りょうり",       meaning:"món ăn, việc nấu ăn" },
  { id:233,lesson:9, jp:"スポーツ",       meaning:"thể thao" },
  { id:234,lesson:9, jp:"やきゅう",       meaning:"bóng chày" },
  { id:235,lesson:9, jp:"ダンス",         meaning:"nhảy, khiêu vũ" },
  { id:236,lesson:9, jp:"おんがく",       meaning:"âm nhạc" },
  { id:237,lesson:9, jp:"うた",           meaning:"bài hát" },
  { id:238,lesson:9, jp:"クラシック",     meaning:"nhạc cổ điển" },
  { id:239,lesson:9, jp:"ジャズ",         meaning:"nhạc jazz" },
  { id:240,lesson:9, jp:"コンサート",     meaning:"buổi hòa nhạc" },
  { id:241,lesson:9, jp:"カラオケ",       meaning:"karaoke" },
  { id:242,lesson:9, jp:"かぶき",         meaning:"Kabuki (ca kịch truyền thống)" },
  { id:243,lesson:9, jp:"え",             meaning:"tranh, hội họa" },
  { id:244,lesson:9, jp:"かんじ",         meaning:"chữ Hán" },
  { id:245,lesson:9, jp:"ひらがな",       meaning:"chữ Hiragana" },
  { id:246,lesson:9, jp:"カタカナ",       meaning:"chữ Katakana" },
  { id:247,lesson:9, jp:"ローマじ",       meaning:"chữ Latinh" },
  { id:248,lesson:9, jp:"じかん",         meaning:"thời gian" },
  { id:249,lesson:9, jp:"ようじ",         meaning:"việc bận, công chuyện" },
  { id:250,lesson:9, jp:"よく",           meaning:"tốt, rõ" },
  { id:251,lesson:9, jp:"だいたい",       meaning:"đại khái, phần lớn" },
  { id:252,lesson:9, jp:"すこし",         meaning:"ít, một ít" },
  { id:253,lesson:9, jp:"あまり",         meaning:"không... lắm (dùng với phủ định)" },
  { id:254,lesson:9, jp:"ぜんぜん",       meaning:"hoàn toàn không (dùng với phủ định)" },
  { id:255,lesson:9, jp:"どうして",       meaning:"tại sao" },

  // ================== BÀI 10 ==================
  {id:256, lesson:10, jp:"あります",        meaning:"có (đồ vật, tồn tại)"},
  {id:257, lesson:10, jp:"います",          meaning:"có (người/động vật, tồn tại)"},
  {id:258, lesson:10, jp:"いろいろ[な]",    meaning:"nhiều loại, đa dạng"},
  {id:259, lesson:10, jp:"おとこのひと",    meaning:"người đàn ông"},
  {id:260, lesson:10, jp:"おんなのひと",    meaning:"người phụ nữ"},
  {id:261, lesson:10, jp:"おとこのこ",      meaning:"cậu bé"},
  {id:262, lesson:10, jp:"おんなのこ",      meaning:"cô bé"},
  {id:263, lesson:10, jp:"いぬ",            meaning:"chó"},
  {id:264, lesson:10, jp:"ねこ",            meaning:"mèo"},
  {id:265, lesson:10, jp:"パンダ",          meaning:"gấu trúc"},
  {id:266, lesson:10, jp:"ぞう",            meaning:"voi"},
  {id:267, lesson:10, jp:"き",              meaning:"cây"},
  {id:268, lesson:10, jp:"もの",            meaning:"đồ vật"},
  {id:269, lesson:10, jp:"うえ",            meaning:"trên"},
  {id:270, lesson:10, jp:"した",            meaning:"dưới"},
  {id:271, lesson:10, jp:"まえ",            meaning:"trước"},
  {id:272, lesson:10, jp:"うしろ",          meaning:"sau"},
  {id:273, lesson:10, jp:"みぎ",            meaning:"(bên) phải"},
  {id:274, lesson:10, jp:"ひだり",          meaning:"(bên) trái"},
  {id:275, lesson:10, jp:"なか",            meaning:"trong, giữa"},
  {id:276, lesson:10, jp:"そと",            meaning:"ngoài"},
  {id:277, lesson:10, jp:"となり",          meaning:"bên cạnh"},
  {id:278, lesson:10, jp:"ちかく",          meaning:"gần"},
  {id:279, lesson:10, jp:"あいだ",          meaning:"giữa, ở giữa ... và ..."},

  // ── BÀI 11 ──
  {id:280, lesson:11, jp:"ひとつ",          meaning:"một cái"},
  {id:281, lesson:11, jp:"ふたつ",          meaning:"hai cái"},
  {id:282, lesson:11, jp:"みっつ",          meaning:"ba cái"},
  {id:283, lesson:11, jp:"よっつ",          meaning:"bốn cái"},
  {id:284, lesson:11, jp:"いつつ",          meaning:"năm cái"},
  {id:285, lesson:11, jp:"むっつ",          meaning:"sáu cái"},
  {id:286, lesson:11, jp:"ななつ",          meaning:"bảy cái"},
  {id:287, lesson:11, jp:"やっつ",          meaning:"tám cái"},
  {id:288, lesson:11, jp:"ここのつ",        meaning:"chín cái"},
  {id:289, lesson:11, jp:"とお",            meaning:"mười cái"},
  {id:290, lesson:11, jp:"いくつ",          meaning:"mấy cái, bao nhiêu cái"},
  {id:291, lesson:11, jp:"りんご",          meaning:"táo"},
  {id:292, lesson:11, jp:"みかん",          meaning:"quýt"},
  {id:293, lesson:11, jp:"サンドイッチ",    meaning:"bánh san-uych"},
  {id:294, lesson:11, jp:"カレーライス",    meaning:"cơm ca-ri"},
  {id:295, lesson:11, jp:"アイスクリーム",  meaning:"kem"},
  {id:296, lesson:11, jp:"きって",          meaning:"tem"},
  {id:297, lesson:11, jp:"はがき",          meaning:"bưu thiếp"},
  {id:298, lesson:11, jp:"ふうとう",        meaning:"phong bì"},
  {id:299, lesson:11, jp:"きょうだい",      meaning:"anh chị em"},

  // ── BÀI 12 ──
  {id:300, lesson:12, jp:"かんたん[な]",    meaning:"đơn giản, dễ"},
  {id:301, lesson:12, jp:"ちかい",          meaning:"gần"},
  {id:302, lesson:12, jp:"とおい",          meaning:"xa"},
  {id:303, lesson:12, jp:"はやい",          meaning:"nhanh, sớm"},
  {id:304, lesson:12, jp:"おそい",          meaning:"chậm, muộn"},
  {id:305, lesson:12, jp:"おおい",          meaning:"nhiều"},
  {id:306, lesson:12, jp:"すくない",        meaning:"ít"},
  {id:307, lesson:12, jp:"あまい",          meaning:"ngọt"},
  {id:308, lesson:12, jp:"からい",          meaning:"cay"},
  {id:309, lesson:12, jp:"おもい",          meaning:"nặng"},
  {id:310, lesson:12, jp:"かるい",          meaning:"nhẹ"},
  {id:311, lesson:12, jp:"きせつ",          meaning:"mùa"},
  {id:312, lesson:12, jp:"はる",            meaning:"mùa xuân"},
  {id:313, lesson:12, jp:"なつ",            meaning:"mùa hè"},
  {id:314, lesson:12, jp:"あき",            meaning:"mùa thu"},
  {id:315, lesson:12, jp:"ふゆ",            meaning:"mùa đông"},
  {id:316, lesson:12, jp:"てんき",          meaning:"thời tiết"},
  {id:317, lesson:12, jp:"あめ",            meaning:"mưa"},
  {id:318, lesson:12, jp:"ゆき",            meaning:"tuyết"},
  {id:319, lesson:12, jp:"くもり",          meaning:"có mây"},
  {id:320, lesson:12, jp:"ホテル",          meaning:"khách sạn"},
  {id:321, lesson:12, jp:"くうこう",        meaning:"sân bay"},
  {id:322, lesson:12, jp:"うみ",            meaning:"biển, đại dương"},
  {id:323, lesson:12, jp:"せかい",          meaning:"thế giới"},

  // ── BÀI 13 ──
  {id:324, lesson:13, jp:"あそびます",      meaning:"chơi"},
  {id:325, lesson:13, jp:"およぎます",      meaning:"bơi"},
  {id:326, lesson:13, jp:"つかれます",      meaning:"mệt"},
  {id:327, lesson:13, jp:"けっこんします",  meaning:"kết hôn"},
  {id:328, lesson:13, jp:"かいものします",  meaning:"mua sắm"},
  {id:329, lesson:13, jp:"ほしい",          meaning:"muốn có"},
  {id:330, lesson:13, jp:"ひろい",          meaning:"rộng"},
  {id:331, lesson:13, jp:"せまい",          meaning:"chật, hẹp"},
  {id:332, lesson:13, jp:"プール",          meaning:"bể bơi"},
  {id:333, lesson:13, jp:"かわ",            meaning:"sông"},
  {id:334, lesson:13, jp:"びじゅつ",        meaning:"mỹ thuật"},
  {id:335, lesson:13, jp:"さかな釣り",      meaning:"việc câu cá"},
  {id:336, lesson:13, jp:"スキー",          meaning:"việc trượt tuyết"},
  {id:337, lesson:13, jp:"なにか",          meaning:"cái gì đó"},
  {id:338, lesson:13, jp:"どこか",          meaning:"đâu đó, chỗ nào đó"},

  // ── BÀI 14 ──
  {id:339, lesson:14, jp:"つけます",        meaning:"bật (điện, máy)"},
  {id:340, lesson:14, jp:"けします",        meaning:"tắt (điện, máy)"},
  {id:341, lesson:14, jp:"あけます",        meaning:"mở (cửa, cửa sổ)"},
  {id:342, lesson:14, jp:"しめます",        meaning:"đóng (cửa, cửa sổ)"},
  {id:343, lesson:14, jp:"まちます",        meaning:"chờ, đợi"},
  {id:344, lesson:14, jp:"てつだいます",    meaning:"giúp (làm việc gì)"},
  {id:345, lesson:14, jp:"はなします",      meaning:"nói chuyện"},
  {id:346, lesson:14, jp:"つかいます",      meaning:"sử dụng, dùng"},
  {id:347, lesson:14, jp:"とります",        meaning:"lấy, chuyển"},
  {id:348, lesson:14, jp:"みせます",        meaning:"cho xem, trình"},
  {id:349, lesson:14, jp:"おしえます",      meaning:"nói, cho biết [địa chỉ]"},
  {id:350, lesson:14, jp:"でんき",          meaning:"điện, đèn điện"},
  {id:351, lesson:14, jp:"エアコン",        meaning:"máy điều hòa (nhiệt độ)"},
  {id:352, lesson:14, jp:"プロジェクター",  meaning:"hộ chiếu"},
  {id:353, lesson:14, jp:"なまえ",          meaning:"tên"},
  {id:354, lesson:14, jp:"じゅうしょ",      meaning:"địa chỉ"},
  {id:355, lesson:14, jp:"ちず",            meaning:"bản đồ"},
  {id:356, lesson:14, jp:"まっすぐ",        meaning:"thẳng"},
  {id:357, lesson:14, jp:"みち",            meaning:"đường"},
  {id:358, lesson:14, jp:"すぐ",            meaning:"ngay, lập tức"},
  {id:359, lesson:14, jp:"あとで",          meaning:"sau"},

  // ── BÀI 15 ──
  {id:360, lesson:15, jp:"できます",        meaning:"có thể"},
  {id:361, lesson:15, jp:"うります",        meaning:"bán"},
  {id:362, lesson:15, jp:"つくります",      meaning:"làm, chế tạo, sản xuất"},
  {id:363, lesson:15, jp:"しります",        meaning:"biết"},
  {id:364, lesson:15, jp:"すんでいます",    meaning:"sống, ở"},
  {id:365, lesson:15, jp:"けんきゅうします", meaning:"nghiên cứu"},
  {id:366, lesson:15, jp:"しりょう",        meaning:"tài liệu, tư liệu"},
  {id:367, lesson:15, jp:"カタログ",        meaning:"ca-ta-lo"},
  {id:368, lesson:15, jp:"じかんひょう",    meaning:"bảng giờ chạy tàu"},
  {id:369, lesson:15, jp:"ふく",            meaning:"quần áo"},
  {id:370, lesson:15, jp:"せいひん",        meaning:"sản phẩm"},
  {id:371, lesson:15, jp:"ソフト",          meaning:"phần mềm"},
  {id:372, lesson:15, jp:"きんし",          meaning:"cấm"},
  {id:373, lesson:15, jp:"けいざい",        meaning:"kinh tế"},
  {id:374, lesson:15, jp:"しやくしょ",      meaning:"tòa thị chính"},
  {id:375, lesson:15, jp:"こうこう",        meaning:"trường phổ thông trung học, trường cấp 3"},
  {id:376, lesson:15, jp:"はいしゃ",        meaning:"nha sĩ"},
  {id:377, lesson:15, jp:"どくしん",        meaning:"độc thân"},

  // ── BÀI 16 ──
  {id:378, lesson:16, jp:"のります",        meaning:"đi, lên [tàu]"},
  {id:379, lesson:16, jp:"おります",        meaning:"xuống [tàu]"},
  {id:380, lesson:16, jp:"のりかえます",    meaning:"chuyển, đổi [tàu]"},
  {id:381, lesson:16, jp:"あびます",        meaning:"tắm [vòi hoa sen]"},
  {id:382, lesson:16, jp:"いれます",        meaning:"cho vào, bỏ vào"},
  {id:383, lesson:16, jp:"だします",        meaning:"lấy ra, đưa ra, gửi"},
  {id:384, lesson:16, jp:"おろします",      meaning:"rút [tiền]"},
  {id:385, lesson:16, jp:"はいります",      meaning:"vào [đại học]"},
  {id:386, lesson:16, jp:"でます",          meaning:"ra, tốt nghiệp [đại học]"},
  {id:387, lesson:16, jp:"おします",        meaning:"bấm, ấn"},
  {id:388, lesson:16, jp:"はじめます",      meaning:"bắt đầu"},
  {id:389, lesson:16, jp:"けんがくします",  meaning:"tham quan kiến tập"},
  {id:390, lesson:16, jp:"でんわします",    meaning:"gọi điện thoại"},
  {id:391, lesson:16, jp:"わかい",          meaning:"trẻ"},
  {id:392, lesson:16, jp:"みじかい",        meaning:"ngắn"},
  {id:393, lesson:16, jp:"くらい",          meaning:"tối"},
  {id:394, lesson:16, jp:"あかるい",        meaning:"sáng"},
  {id:395, lesson:16, jp:"からだ",          meaning:"người, cơ thể"},
  {id:396, lesson:16, jp:"あたま",          meaning:"đầu"},
  {id:397, lesson:16, jp:"かみ",            meaning:"tóc"},
  {id:398, lesson:16, jp:"かお",            meaning:"mặt"},
  {id:399, lesson:16, jp:"め",              meaning:"mắt"},
  {id:400, lesson:16, jp:"みみ",            meaning:"tai"},
  {id:401, lesson:16, jp:"はな",            meaning:"mũi"},
  {id:402, lesson:16, jp:"くち",            meaning:"miệng"},
  {id:403, lesson:16, jp:"は",              meaning:"răng"},
  {id:404, lesson:16, jp:"おなか",          meaning:"bụng"},
  {id:405, lesson:16, jp:"あし",            meaning:"chân"},
  {id:406, lesson:16, jp:"せ",              meaning:"chiều cao (cơ thể)"},

  // ── BÀI 17 ──
  {id:407, lesson:17, jp:"わすれます",      meaning:"quên"},
  {id:408, lesson:17, jp:"なくします",      meaning:"làm mất, đánh mất"},
  {id:409, lesson:17, jp:"はらいます",      meaning:"trả tiền"},
  {id:410, lesson:17, jp:"かえします",      meaning:"trả lại"},
  {id:411, lesson:17, jp:"でかけます",      meaning:"ra ngoài"},
  {id:412, lesson:17, jp:"もっていきます",  meaning:"mang đi, mang theo"},
  {id:413, lesson:17, jp:"もってきます",    meaning:"mang đến"},
  {id:414, lesson:17, jp:"しんぱいします",  meaning:"lo lắng"},
  {id:415, lesson:17, jp:"ざんぎょうします", meaning:"làm thêm giờ"},
  {id:416, lesson:17, jp:"しゅっちょうします", meaning:"đi công tác"},
  {id:417, lesson:17, jp:"たいせつ[な]",    meaning:"quan trọng, quý giá"},
  {id:418, lesson:17, jp:"だいじょうぶ[な]", meaning:"không sao, không có vấn đề gì"},
  {id:419, lesson:17, jp:"あぶない",        meaning:"nguy hiểm"},
  {id:420, lesson:17, jp:"きんえん",        meaning:"cấm hút thuốc"},
  {id:421, lesson:17, jp:"ねつ",            meaning:"sốt"},
  {id:422, lesson:17, jp:"びょうき",        meaning:"ốm, bệnh"},
  {id:423, lesson:17, jp:"くすり",          meaning:"thuốc"},
  {id:424, lesson:17, jp:"アオ",            meaning:"áo khoác"},
  {id:425, lesson:17, jp:"したぎ",          meaning:"quần áo lót"},

  // ── BÀI 18 ──
  {id:426, lesson:18, jp:"ひきます",        meaning:"chơi (nhạc cụ, piano, v.v.)"},
  {id:427, lesson:18, jp:"うたいます",      meaning:"hát"},
  {id:428, lesson:18, jp:"あつめます",      meaning:"sưu tầm, thu thập, tập hợp"},
  {id:429, lesson:18, jp:"すてます",        meaning:"vứt, bỏ, bỏ đi"},
  {id:430, lesson:18, jp:"こうかんします",  meaning:"đổi, trao đổi"},
  {id:431, lesson:18, jp:"うんてんします",  meaning:"lái"},
  {id:432, lesson:18, jp:"よやくします",    meaning:"đặt chỗ, đặt trước"},
  {id:433, lesson:18, jp:"ピアノ",          meaning:"đàn piano"},
  {id:434, lesson:18, jp:"げんきん",        meaning:"tiền mặt"},
  {id:435, lesson:18, jp:"しゅみ",          meaning:"sở thích, thú vui"},
  {id:436, lesson:18, jp:"にっき",          meaning:"nhật ký"},
  {id:437, lesson:18, jp:"インターネット",  meaning:"Internet"},

  // ── BÀI 19 ──
  {id:438, lesson:19, jp:"のぼります",      meaning:"leo (núi), lên"},
  {id:439, lesson:19, jp:"とまります",      meaning:"trọ [ở khách sạn]"},
  {id:440, lesson:19, jp:"そうじします",    meaning:"dọn vệ sinh (căn phòng)"},
  {id:441, lesson:19, jp:"せんたくします",  meaning:"giặt (áo quần)"},
  {id:442, lesson:19, jp:"なります",        meaning:"trở thành, trở nên"},
  {id:443, lesson:19, jp:"ねむい",          meaning:"buồn ngủ"},
  {id:444, lesson:19, jp:"つよい",          meaning:"mạnh"},
  {id:445, lesson:19, jp:"よわい",          meaning:"yếu"},
  {id:446, lesson:19, jp:"れんしゅう",      meaning:"sự luyện tập"},
  {id:447, lesson:19, jp:"ゴルフ",          meaning:"gôn"},
  {id:448, lesson:19, jp:"すもう",          meaning:"môn vật Sumo"},
  {id:449, lesson:19, jp:"ひ",              meaning:"ngày"},
  {id:450, lesson:19, jp:"じょうたい",      meaning:"tình trạng, trạng thái"},
  {id:451, lesson:19, jp:"いちど",          meaning:"một lần"},
  {id:452, lesson:19, jp:"だんだん",        meaning:"dần dần"},
  {id:453, lesson:19, jp:"そろそろ",        meaning:"sắp, sắp sửa"},

  // ── BÀI 20 ──
  {id:454, lesson:20, jp:"いります",        meaning:"cần [thị thực/visa]"},
  {id:455, lesson:20, jp:"しらべます",      meaning:"tìm hiểu, kiểm tra, điều tra"},
  {id:456, lesson:20, jp:"しゅうりします",  meaning:"sửa chữa, tu sửa"},
  {id:457, lesson:20, jp:"ぼく",            meaning:"tôi (xưng hô thân mật của nam)"},
  {id:458, lesson:20, jp:"きみ",            meaning:"cậu, bạn (thân mật)"},
  {id:459, lesson:20, jp:"きもの",          meaning:"kimono (trang phục truyền thống)"},
  {id:460, lesson:20, jp:"ビザ",            meaning:"thị thực, visa"},
  {id:461, lesson:20, jp:"はじめ",          meaning:"ban đầu, đầu tiên"},
  {id:462, lesson:20, jp:"おわり",          meaning:"kết thúc, hết phim"},
  {id:463, lesson:20, jp:"こっち",          meaning:"phía này, chỗ này (thân mật)"},
  {id:464, lesson:20, jp:"そっち",          meaning:"phía đó, chỗ đó (thân mật)"},
  {id:465, lesson:20, jp:"あっち",          meaning:"phía kia, chỗ kia (thân mật)"},
  {id:466, lesson:20, jp:"どっち",          meaning:"cái nào (giữa hai cái, thân mật)"},
  {id:467, lesson:20, jp:"みんなで",        meaning:"mọi người cùng"},

  // ── BÀI 21 ──
  {id:468, lesson:21, jp:"かんがえます",    meaning:"nghĩ, suy nghĩ"},
  {id:469, lesson:21, jp:"いいます",        meaning:"nói"},
  {id:470, lesson:21, jp:"かちます",        meaning:"thắng"},
  {id:471, lesson:21, jp:"まけます",        meaning:"thua"},
  {id:472, lesson:21, jp:"やめます",        meaning:"bỏ, thôi [việc công ty]"},
  {id:473, lesson:21, jp:"もったいない",    meaning:"lãng phí, vô ích"},
  {id:474, lesson:21, jp:"ふべん[な]",      meaning:"bất tiện"},
  {id:475, lesson:21, jp:"じじつ",          meaning:"sự thật"},
  {id:476, lesson:21, jp:"うそ",            meaning:"sự giả dối, giả dối"},
  {id:477, lesson:21, jp:"じどうしゃ",      meaning:"ô tô, xe hơi"},
  {id:478, lesson:21, jp:"こうつう",        meaning:"giao thông, đi lại"},
  {id:479, lesson:21, jp:"ぶっか",          meaning:"giá cả, mức giá, vật giá"},
  {id:480, lesson:21, jp:"ニュース",        meaning:"tin tức, bản tin"},
  {id:481, lesson:21, jp:"アニメ",          meaning:"phim hoạt hình (Nhật Bản)"},
  {id:482, lesson:21, jp:"マンガ",          meaning:"truyện tranh"},
  {id:483, lesson:21, jp:"デザイン",        meaning:"thiết kế"},
  {id:484, lesson:21, jp:"ゆめ",            meaning:"giấc mơ"},
  {id:485, lesson:21, jp:"てんさい",        meaning:"thiên tài"},
  {id:486, lesson:21, jp:"しあい",          meaning:"trận đấu"},

  // ── BÀI 22 ──
  {id:487, lesson:22, jp:"きます",          meaning:"mặc (áo sơ mi, v.v.)"},
  {id:488, lesson:22, jp:"はきます",        meaning:"đi, mặc (giày, quần âu, v.v.)"},
  {id:489, lesson:22, jp:"かぶります",      meaning:"đội (mũ, v.v.)"},
  {id:490, lesson:22, jp:"かけます",        meaning:"đeo [kính]"},
  {id:491, lesson:22, jp:"うまれます",      meaning:"sinh ra"},
  {id:492, lesson:22, jp:"わたしたち",      meaning:"chúng tôi, chúng ta"},
  {id:493, lesson:22, jp:"コート",          meaning:"áo khoác"},
  {id:494, lesson:22, jp:"セーター",        meaning:"áo len"},
  {id:495, lesson:22, jp:"スーツ",          meaning:"com-le, vét"},
  {id:496, lesson:22, jp:"ぼうし",          meaning:"mũ"},
  {id:497, lesson:22, jp:"めがね",          meaning:"kính"},
  {id:498, lesson:22, jp:"おかし",          meaning:"bánh ngọt"},

  // ── BÀI 23 ──
  {id:499, lesson:23, jp:"ひきます",        meaning:"kéo"},
  {id:500, lesson:23, jp:"おします",        meaning:"đẩy"},
  {id:501, lesson:23, jp:"さわります",      meaning:"sờ, chạm vào [cửa]"},
  {id:502, lesson:23, jp:"あるきます",      meaning:"đi bộ"},
  {id:503, lesson:23, jp:"わたります",      meaning:"qua, đi qua [cầu]"},
  {id:504, lesson:23, jp:"まがります",      meaning:"rẽ, quẹo [phải]"},
  {id:505, lesson:23, jp:"さびしい",        meaning:"buồn, cô đơn"},
  {id:506, lesson:23, jp:"おゆ",            meaning:"nước nóng"},
  {id:507, lesson:23, jp:"おと",            meaning:"âm thanh"},
  {id:508, lesson:23, jp:"こしょう",        meaning:"sự hỏng, hỏng hóc"},
  {id:509, lesson:23, jp:"こうさてん",      meaning:"ngã tư"},
  {id:510, lesson:23, jp:"しんごう",        meaning:"đèn tín hiệu"},
  {id:511, lesson:23, jp:"かど",            meaning:"góc"},
  {id:512, lesson:23, jp:"はし",            meaning:"cầu (bridge)"},
  {id:513, lesson:23, jp:"ちゅうしゃじょう", meaning:"bãi đỗ xe"},
  {id:514, lesson:23, jp:"たてもの",        meaning:"tòa nhà"},
  {id:515, lesson:23, jp:"なんども",        meaning:"nhiều lần"},

  // ── BÀI 24 ──
  {id:516, lesson:24, jp:"くれます",        meaning:"cho, tặng (tôi)"},
  {id:517, lesson:24, jp:"なおします",      meaning:"chữa, sửa"},
  {id:518, lesson:24, jp:"つれていきます",  meaning:"dẫn (một ai đó) đi"},
  {id:519, lesson:24, jp:"つれてきます",    meaning:"dẫn (một ai đó) đến"},
  {id:520, lesson:24, jp:"おくります",      meaning:"tiễn [một ai đó]"},
  {id:521, lesson:24, jp:"しょうかいします", meaning:"giới thiệu"},
  {id:522, lesson:24, jp:"あんないします",  meaning:"hướng dẫn, giới thiệu, dẫn đường"},
  {id:523, lesson:24, jp:"せつめいします",  meaning:"giải thích, trình bày"},
  {id:524, lesson:24, jp:"おじいさん",      meaning:"ông nội/ngoại, ông (cụ/lão)"},
  {id:525, lesson:24, jp:"おばあさん",      meaning:"bà nội/ngoại, bà (cụ/lão)"},
  {id:526, lesson:24, jp:"じゅんび",        meaning:"sự chuẩn bị"},
  {id:527, lesson:24, jp:"ひっこし",        meaning:"sự chuyển nhà"},
  {id:528, lesson:24, jp:"ホームステイ",    meaning:"homestay"},
  {id:529, lesson:24, jp:"ぜんぶ",          meaning:"toàn bộ, tất cả"},
  {id:530, lesson:24, jp:"じぶん",          meaning:"tự (mình)"},

  // ── BÀI 25 ──
  {id:531, lesson:25, jp:"おもいます",      meaning:"nghĩ, suy nghĩ"},
  {id:532, lesson:25, jp:"つきます",        meaning:"đến"},
  {id:533, lesson:25, jp:"とります",        meaning:"có, thêm [tuổi]"},
  {id:534, lesson:25, jp:"たります",        meaning:"đủ"},
  {id:535, lesson:25, jp:"いなか",          meaning:"quê, nông thôn"},
  {id:536, lesson:25, jp:"きかい",          meaning:"cơ hội"},
  {id:537, lesson:25, jp:"いちおく",        meaning:"một trăm triệu"},
  {id:538, lesson:25, jp:"もし",            meaning:"nếu"},
  {id:539, lesson:25, jp:"いみ",            meaning:"nghĩa, ý nghĩa"},
  {id:540, lesson:25, jp:"もし〜たら",      meaning:"nếu... thì..."},
  {id:541, lesson:25, jp:"〜ても",          meaning:"cho dù... thì..."},
];

const LESSON_ACCENT = {
  1:"#D85A30", 2:"#1D9E75", 3:"#378ADD", 4:"#BA7517",
  5:"#D4537E", 6:"#534AB7", 7:"#0F6E56", 8:"#A32D2D", 
  9:"#3B6D11", 10:"#6B4E9E", 11:"#E07A5F", 12:"#3D9E7E",
  13:"#2A6D9E", 14:"#9E4E3D"
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(correct, pool) {
  const others = shuffle(pool.filter(v => v.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...others]);
}

const styles = {
  root: { fontFamily: "'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', sans-serif", padding: "16px 0", maxWidth: 640, margin: "0 auto" },
  header: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 },
  subtitle: { fontSize: 14, color: "var(--color-text-secondary)", margin: 0 },
  section: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 8, display: "block" },
  lessonGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 },
  lessonBtn: (active, n) => ({
    padding: "10px 4px", border: `2px solid ${active ? LESSON_ACCENT[n] : "#ddd"}`,
    borderRadius: 8, background: active ? LESSON_ACCENT[n] : "transparent",
    color: active ? "#fff" : "#555", fontSize: 14, fontWeight: 500, cursor: "pointer"
  }),
  modeRow: { display:"flex", gap:8, marginBottom:16 },
  modeBtn: (active) => ({
    flex:1, padding:"9px 0", border:`0.5px solid ${active ? "var(--color-border-primary)" : "var(--color-border-tertiary)"}`,
    borderRadius:8, background: active ? "var(--color-background-secondary)" : "transparent",
    color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
    fontSize:14, cursor:"pointer", transition:"all 0.15s"
  }),
  startBtn: (color) => ({
    flex:1, padding:"12px 0", borderRadius:10, border:"none",
    background: color, color:"#fff", fontSize:15, fontWeight:500,
    cursor:"pointer", transition:"opacity 0.15s"
  }),
  countBadge: { fontSize:12, color:"var(--color-text-secondary)", marginLeft:8 },

  card: {
    background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)",
    borderRadius:16, padding:"40px 32px", textAlign:"center",
    cursor:"pointer", userSelect:"none", transition:"transform 0.15s, box-shadow 0.15s",
    minHeight:180, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    gap:12
  },
  jpText: { fontSize:40, fontWeight:400, color:"var(--color-text-primary)", lineHeight:1.3 },
  vnText: { fontSize:22, color:"var(--color-text-primary)", lineHeight:1.4 },
  hintText: { fontSize:13, color:"var(--color-text-tertiary)" },
  lessonTag: (n) => ({
    display:"inline-block", fontSize:11, fontWeight:500, padding:"2px 8px",
    borderRadius:20, background: LESSON_ACCENT[n] + "22",
    color: LESSON_ACCENT[n], marginBottom:8
  }),

  progress: { display:"flex", alignItems:"center", gap:10, marginBottom:16 },
  progressBar: { flex:1, height:4, background:"var(--color-border-tertiary)", borderRadius:2, overflow:"hidden" },
  progressFill: (pct, color) => ({ height:"100%", width:`${pct}%`, background: color, borderRadius:2, transition:"width 0.3s" }),

  navRow: { display:"flex", gap:8, marginTop:12 },
  navBtn: { flex:1, padding:"10px", border:"0.5px solid var(--color-border-tertiary)", borderRadius:8,
    background:"transparent", color:"var(--color-text-primary)", fontSize:14, cursor:"pointer" },
  prevNext: { display:"flex", gap:8, marginTop:16 },

  optBtn: (state) => {
    const base = { width:"100%", padding:"14px 16px", marginBottom:8, border:"0.5px solid var(--color-border-tertiary)",
      borderRadius:10, background:"var(--color-background-primary)", color:"var(--color-text-primary)",
      fontSize:15, textAlign:"left", cursor: state ? "default" : "pointer", transition:"all 0.15s" };
    if (state === "correct") return { ...base, background:"#EAF3DE", border:"1.5px solid #639922", color:"#3B6D11" };
    if (state === "wrong")   return { ...base, background:"#FCEBEB", border:"1.5px solid #E24B4A", color:"#A32D2D" };
    return base;
  },

  resultsCard: { background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:16, padding:32, textAlign:"center" },
  scoreBig: { fontSize:56, fontWeight:500, color:"var(--color-text-primary)", lineHeight:1 },
  scoreLabel: { fontSize:15, color:"var(--color-text-secondary)", marginTop:6 },
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selLessons, setSelLessons] = useState(new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,14]));
  const [direction, setDirection] = useState("jp");

  const [deck, setDeck] = useState([]);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [quizDeck, setQuizDeck] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [quizHistory, setQuizHistory] = useState([]);

  const filtered = VOCAB.filter(v => selLessons.has(v.lesson));

  const toggleLesson = (n) => {
    setSelLessons(prev => {
      const s = new Set(prev);
      if (s.has(n)) {
        if (s.size > 1) s.delete(n);
      } else s.add(n);
      return s;
    });
  };

  const startStudy = () => {
    const d = shuffle(filtered);
    setDeck(d);
    setCardIdx(0);
    setFlipped(false);
    setScreen("study");
  };

  const startQuiz = () => {
    const d = shuffle(filtered);
    setQuizDeck(d);
    setQuizIdx(0);
    setScore(0);
    setSelected(null);
    setQuizHistory([]);
    setOptions(buildOptions(d[0], filtered));
    setScreen("quiz");
  };

  const flipCard = () => setFlipped(f => !f);
  const prevCard = () => { if (cardIdx > 0) { setCardIdx(i => i-1); setFlipped(false); } };
  const nextCard = () => { if (cardIdx < deck.length-1) { setCardIdx(i => i+1); setFlipped(false); } };

  const handleAnswer = useCallback((opt) => {
    if (selected) return;
    const correct = opt.id === quizDeck[quizIdx].id;
    setSelected(opt.id);
    if (correct) setScore(s => s + 1);
    setQuizHistory(h => [...h, {q: quizDeck[quizIdx], chosen: opt.id, correct}]);
  }, [selected, quizDeck, quizIdx]);

  const nextQuiz = () => {
    const ni = quizIdx + 1;
    if (ni >= quizDeck.length) {
      setScreen("results");
      return;
    }
    setQuizIdx(ni);
    setSelected(null);
    setOptions(buildOptions(quizDeck[ni], filtered));
  };

  const restart = () => setScreen("home");

  if (screen === "home") {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <div>
            <p style={styles.title}>Minna no Nihongo</p>
            <p style={styles.subtitle}>みんなの日本語 — Từ vựng Bài 1–14</p>
          </div>
        </div>

        <div style={styles.section}>
          <span style={styles.label}>Chọn bài học</span>
          <div style={styles.lessonGrid}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
              <button key={n} style={styles.lessonBtn(selLessons.has(n), n)} onClick={() => toggleLesson(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <span style={styles.label}>Hướng ôn</span>
          <button onClick={() => setDirection("jp")} style={{marginRight:10, padding:"8px 16px"}}>
            Nhật → Việt
          </button>
          <button onClick={() => setDirection("vn")} style={{padding:"8px 16px"}}>
            Việt → Nhật
          </button>
        </div>

        <div style={{display:"flex", gap:12, marginTop:20}}>
          <button onClick={startStudy} style={{flex:1, padding:"14px", background:"#378ADD", color:"white", border:"none", borderRadius:8, fontSize:16}}>
            Ôn Flashcard
          </button>
          <button onClick={startQuiz} style={{flex:1, padding:"14px", background:"#D85A30", color:"white", border:"none", borderRadius:8, fontSize:16}}>
            Làm Quiz
          </button>
        </div>
      </div>
    );
  }

  if (screen === "study") {
    const card = deck[cardIdx];
    const pct  = Math.round(((cardIdx + 1) / deck.length) * 100);
    const front = direction === "jp" ? card.jp : card.meaning;
    const back  = direction === "jp" ? card.meaning : card.jp;
    const isBig = direction === "jp" || flipped; // big Japanese when showing jp side

    return (
      <div style={styles.root}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <button style={{ ...styles.navBtn, flex:"none", padding:"6px 12px", fontSize:13 }} onClick={restart}>← Về</button>
          <span style={{ fontSize:14, color:"var(--color-text-secondary)", flex:1 }}>Ôn tập</span>
          <span style={{ fontSize:14, color:"var(--color-text-secondary)" }}>{cardIdx+1} / {deck.length}</span>
        </div>

        <div style={styles.progress}>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(pct, "#378ADD")} />
          </div>
          <span style={{ fontSize:12, color:"var(--color-text-secondary)", minWidth:32 }}>{pct}%</span>
        </div>

        <div style={styles.card} onClick={flipCard}>
          <span style={styles.lessonTag(card.lesson)}>Bài {card.lesson}</span>
          {!flipped ? (
            <>
              <div style={direction === "jp" ? styles.jpText : styles.vnText}>{front}</div>
              <div style={styles.hintText}>Nhấn để lật xem đáp án</div>
            </>
          ) : (
            <>
              <div style={{ fontSize:13, color:"var(--color-text-tertiary)", marginBottom:4 }}>{front}</div>
              <div style={direction === "vn" ? styles.jpText : styles.vnText}>{back}</div>
            </>
          )}
        </div>

        <div style={styles.navRow}>
          <button style={{ ...styles.navBtn, opacity: cardIdx === 0 ? 0.35 : 1 }} onClick={prevCard}>← Trước</button>
          <button style={{ ...styles.navBtn, opacity: cardIdx === deck.length - 1 ? 0.35 : 1 }} onClick={nextCard}>Tiếp →</button>
        </div>

        {cardIdx === deck.length - 1 && (
          <div style={{ marginTop:12, textAlign:"center" }}>
            <button style={{ ...styles.startBtn("#1D9E75"), padding:"10px 32px", flex:"none" }} onClick={startStudy}>
              Xáo bài lại
            </button>
          </div>
        )}
      </div>
    );
  }

  if (screen === "quiz") {
    const q    = quizDeck[quizIdx];
    const pct  = Math.round((quizIdx / quizDeck.length) * 100);
    const front = direction === "jp" ? q.jp : q.meaning;

    return (
      <div style={styles.root}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <button style={{ ...styles.navBtn, flex:"none", padding:"6px 12px", fontSize:13 }} onClick={restart}>← Về</button>
          <span style={{ fontSize:14, color:"var(--color-text-secondary)", flex:1 }}>Kiểm tra</span>
          <span style={{ fontSize:14, color:"var(--color-text-secondary)" }}>
            {quizIdx+1} / {quizDeck.length}
          </span>
        </div>

        <div style={styles.progress}>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(pct, "#D85A30")} />
          </div>
          <span style={{ fontSize:12, color:"var(--color-text-secondary)", minWidth:32 }}>{pct}%</span>
        </div>

        <div style={{ ...styles.card, cursor:"default", marginBottom:16 }}>
          <span style={styles.lessonTag(q.lesson)}>Bài {q.lesson}</span>
          <div style={direction === "jp" ? styles.jpText : styles.vnText}>{front}</div>
          <div style={styles.hintText}>{direction === "jp" ? "Nghĩa tiếng Việt là gì?" : "Chữ Nhật là gì?"}</div>
        </div>

        <div>
          {options.map(opt => {
            let state = null;
            if (selected) {
              if (opt.id === q.id) state = "correct";
              else if (opt.id === selected) state = "wrong";
            }
            const label = direction === "jp" ? opt.meaning : opt.jp;
            return (
              <button key={opt.id} style={styles.optBtn(state)} onClick={() => handleAnswer(opt)}>
                {state === "correct" && "✓ "}
                {state === "wrong"   && "✗ "}
                {label}
              </button>
            );
          })}
        </div>

        {selected && (
          <button style={{ ...styles.startBtn(quizIdx === quizDeck.length - 1 ? "#1D9E75" : "#D85A30"), marginTop:4 }}
            onClick={nextQuiz}>
            {quizIdx === quizDeck.length - 1 ? "Xem kết quả →" : "Câu tiếp theo →"}
          </button>
        )}

        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:10 }}>
          <span style={{ fontSize:13, color:"var(--color-text-secondary)" }}>
            Đúng: {score} / {quizIdx + (selected ? 1 : 0)}
          </span>
        </div>
      </div>
    );
  }

  if (screen === "results") {
    const total   = quizDeck.length;
    const pct     = Math.round((score / total) * 100);
    const wrong   = quizHistory.filter(h => !h.correct);
    const color   = pct >= 80 ? "#1D9E75" : pct >= 60 ? "#BA7517" : "#D85A30";

    return (
      <div style={styles.root}>
        <div style={{ ...styles.resultsCard, marginBottom:16 }}>
          <div style={{ ...styles.scoreBig, color }}>{pct}%</div>
          <div style={styles.scoreLabel}>{score} / {total} câu đúng</div>
          <div style={{ marginTop:16, fontSize:15, color:"var(--color-text-secondary)" }}>
            {pct >= 80 ? "Xuất sắc! Bạn nắm rất vững từ vựng." :
             pct >= 60 ? "Khá tốt! Ôn thêm những từ bị sai nhé." :
                         "Cần luyện tập thêm. Hãy ôn lại nhé!"}
          </div>
        </div>

        {wrong.length > 0 && (
          <div style={{ marginBottom:16 }}>
            <span style={styles.label}>Từ cần ôn lại ({wrong.length} từ)</span>
            {wrong.map(({ q, chosen }, i) => (
              <div key={i} style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)",
                borderRadius:10, padding:"12px 16px", marginBottom:8,
                display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}>
                <div>
                  <div style={{ fontSize:22, color:"var(--color-text-primary)" }}>{q.jp}</div>
                  <div style={{ fontSize:13, color:"#A32D2D", marginTop:2 }}>
                    Bạn chọn: {direction === "jp"
                      ? VOCAB.find(v => v.id === chosen)?.meaning
                      : VOCAB.find(v => v.id === chosen)?.jp}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, color:"var(--color-text-secondary)" }}>Đáp án đúng</div>
                  <div style={{ fontSize:15, color:"#3B6D11", fontWeight:500 }}>
                    {direction === "jp" ? q.meaning : q.jp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          <button style={styles.startBtn("#378ADD")} onClick={startStudy}>Ôn lại flashcard</button>
          <button style={styles.startBtn("#D85A30")} onClick={startQuiz}>Quiz lại</button>
        </div>
        <button style={{ ...styles.navBtn, marginTop:8, padding:"10px", width:"100%", textAlign:"center" }} onClick={restart}>
          Về trang chủ
        </button>
      </div>
    );
  }
  return <div>Đang tải...</div>;
}