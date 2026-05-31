import { useState } from "react";

const LESSONS = [
  { id:1, name:"第１課：Số đếm (1)", color:"#e74c3c", kanji:[
    { char:"一",viet:"NHẤT",meaning:"Một",on:["いち・いっ"],kun:["ひと・ひとつ"],vocab:[{w:"一時",r:"いちじ",m:"1 giờ"},{w:"一人",r:"ひとり",m:"1 người"},{w:"一つ",r:"ひとつ",m:"1 cái"}]},
    { char:"二",viet:"NHỊ",meaning:"Hai",on:["に"],kun:["ふた・ふたつ"],vocab:[{w:"二時",r:"にじ",m:"2 giờ"},{w:"二人",r:"ふたり",m:"2 người"},{w:"二つ",r:"ふたつ",m:"2 cái"}]},
    { char:"三",viet:"TAM",meaning:"Ba",on:["さん"],kun:["みっつ"],vocab:[{w:"三時",r:"さんじ",m:"3 giờ"},{w:"三人",r:"さんにん",m:"3 người"},{w:"三日",r:"みっか",m:"ngày 3"},{w:"三つ",r:"みっつ",m:"3 cái"}]},
    { char:"四",viet:"TỨ",meaning:"Bốn",on:["し"],kun:["よ・よん・よっ"],vocab:[{w:"四月",r:"しがつ",m:"tháng 4"},{w:"四時",r:"よじ",m:"4 giờ"},{w:"四日",r:"よっか",m:"ngày 4"}]},
    { char:"五",viet:"NGŨ",meaning:"Năm",on:["ご"],kun:["いつ・いつつ"],vocab:[{w:"五時",r:"ごじ",m:"5 giờ"},{w:"五人",r:"ごにん",m:"5 người"},{w:"五日",r:"いつか",m:"ngày 5"},{w:"五つ",r:"いつつ",m:"5 cái"}]},
  ]},
  { id:2, name:"第２課：Số đếm (2)", color:"#e67e22", kanji:[
    { char:"六",viet:"LỤC",meaning:"Sáu",on:["ろく・ろっ"],kun:["むっ・むい"],vocab:[{w:"六回",r:"ろっかい",m:"6 lần"},{w:"六時",r:"ろくじ",m:"6 giờ"},{w:"六つ",r:"むっつ",m:"6 cái"},{w:"六日",r:"むいか",m:"ngày 6"}]},
    { char:"七",viet:"THẤT",meaning:"Bảy",on:["しち"],kun:["なな・なの"],vocab:[{w:"七時",r:"しちじ",m:"7 giờ"},{w:"七つ",r:"ななつ",m:"7 cái"},{w:"七日",r:"なのか",m:"ngày 7"}]},
    { char:"八",viet:"BÁT",meaning:"Tám",on:["はち"],kun:["やっ・よう"],vocab:[{w:"八歳",r:"はっさい",m:"8 tuổi"},{w:"八時",r:"はちじ",m:"8 giờ"},{w:"八つ",r:"やっつ",m:"8 cái"},{w:"八日",r:"ようか",m:"ngày 8"}]},
    { char:"九",viet:"CỬU",meaning:"Chín",on:["きゅう・く"],kun:["ここの"],vocab:[{w:"九歳",r:"きゅうさい",m:"9 tuổi"},{w:"九月",r:"くがつ",m:"tháng 9"},{w:"九つ",r:"ここのつ",m:"9 cái"},{w:"九日",r:"ここのか",m:"ngày 9"}]},
    { char:"十",viet:"THẬP",meaning:"Mười",on:["じゅう・じゅっ"],kun:["とお"],vocab:[{w:"十月",r:"じゅうがつ",m:"tháng 10"},{w:"十分",r:"じゅっぷん",m:"10 phút"},{w:"十日",r:"とおか",m:"ngày 10"}]},
  ]},
  { id:3, name:"第３課：Số đếm (3)", color:"#f39c12", kanji:[
    { char:"百",viet:"BÁCH",meaning:"Một trăm",on:["ひゃく・びゃく・ぴゃく"],kun:[],vocab:[{w:"百円",r:"ひゃくえん",m:"100 yên"},{w:"三百",r:"さんびゃく",m:"300"},{w:"六百",r:"ろっぴゃく",m:"600"}]},
    { char:"千",viet:"THIÊN",meaning:"Một nghìn",on:["せん・ぜん"],kun:[],vocab:[{w:"千円",r:"せんえん",m:"1000 yên"},{w:"三千",r:"さんぜん",m:"3000"}]},
    { char:"万",viet:"VẠN",meaning:"Mười nghìn",on:["まん"],kun:[],vocab:[{w:"一万円",r:"いちまんえん",m:"10.000 yên"},{w:"万",r:"まん",m:"10.000"}]},
    { char:"円",viet:"VIÊN",meaning:"Đồng Yên (¥)",on:["えん"],kun:[],vocab:[{w:"五千円",r:"ごせんえん",m:"5000 yên"},{w:"百円",r:"ひゃくえん",m:"100 yên"}]},
    { char:"何",viet:"HÀ",meaning:"Cái gì / Bao nhiêu",on:[],kun:["なに・なん"],vocab:[{w:"何",r:"なに/なん",m:"cái gì / bao nhiêu"},{w:"何時",r:"なんじ",m:"mấy giờ"}]},
  ]},
  { id:4, name:"第４課：Thời gian (1)", color:"#2ecc71", kanji:[
    { char:"日",viet:"NHẬT",meaning:"Mặt trời / Ngày",on:["にち・にっ"],kun:["ひ・び・か"],vocab:[{w:"日曜日",r:"にちようび",m:"Chủ Nhật"},{w:"毎日",r:"まいにち",m:"mỗi ngày"},{w:"誕生日",r:"たんじょうび",m:"sinh nhật"},{w:"五日",r:"いつか",m:"ngày 5"}]},
    { char:"月",viet:"NGUYỆT",meaning:"Mặt trăng / Tháng",on:["がつ・げつ"],kun:["つき"],vocab:[{w:"一月",r:"いちがつ",m:"tháng 1"},{w:"月曜日",r:"げつようび",m:"thứ Hai"},{w:"毎月",r:"まいつき",m:"mỗi tháng"},{w:"月",r:"つき",m:"mặt trăng"}]},
    { char:"火",viet:"HỎA",meaning:"Lửa",on:["か"],kun:["ひ・び"],vocab:[{w:"火曜日",r:"かようび",m:"thứ Ba"},{w:"火",r:"ひ",m:"lửa"}]},
    { char:"水",viet:"THỦY",meaning:"Nước",on:["すい"],kun:["みず"],vocab:[{w:"水曜日",r:"すいようび",m:"thứ Tư"},{w:"水",r:"みず",m:"nước"}]},
    { char:"木",viet:"MỘC",meaning:"Cây / Gỗ",on:["もく"],kun:["き"],vocab:[{w:"木曜日",r:"もくようび",m:"thứ Năm"},{w:"木",r:"き",m:"cây"}]},
  ]},
  { id:5, name:"第５課：Thời gian (2)", color:"#1abc9c", kanji:[
    { char:"金",viet:"KIM",meaning:"Vàng / Tiền",on:["きん"],kun:["かね"],vocab:[{w:"金曜日",r:"きんようび",m:"thứ Sáu"},{w:"お金",r:"おかね",m:"tiền"}]},
    { char:"土",viet:"THỔ",meaning:"Đất",on:["ど"],kun:["つち"],vocab:[{w:"土曜日",r:"どようび",m:"thứ Bảy"},{w:"土",r:"つち",m:"đất"}]},
    { char:"今",viet:"KIM (hiện)",meaning:"Bây giờ",on:["こん"],kun:["いま"],vocab:[{w:"今晩",r:"こんばん",m:"tối nay"},{w:"今",r:"いま",m:"bây giờ"},{w:"今日",r:"きょう",m:"hôm nay"}]},
    { char:"年",viet:"NIÊN",meaning:"Năm",on:["ねん"],kun:["とし"],vocab:[{w:"去年",r:"きょねん",m:"năm ngoái"},{w:"今年",r:"ことし",m:"năm nay"},{w:"年",r:"とし/ねん",m:"năm"}]},
    { char:"夕",viet:"TỊCH",meaning:"Chiều tối",on:[],kun:["ゆう"],vocab:[{w:"夕方",r:"ゆうがた",m:"chiều tối"}]},
  ]},
  { id:6, name:"第６課：Thời gian (3)", color:"#3498db", kanji:[
    { char:"時",viet:"THỜI",meaning:"Giờ / Thời gian",on:["じ"],kun:["とき"],vocab:[{w:"何時",r:"なんじ",m:"mấy giờ"},{w:"七時",r:"しちじ",m:"7 giờ"},{w:"時々",r:"ときどき",m:"thỉnh thoảng"}]},
    { char:"分",viet:"PHÂN",meaning:"Phút / Chia",on:["ふん・ぷん・ぶん"],kun:["わ"],vocab:[{w:"五分",r:"ごふん",m:"5 phút"},{w:"四十分",r:"よんじゅっぷん",m:"40 phút"},{w:"分かります",r:"わかります",m:"hiểu"}]},
    { char:"半",viet:"BÁN",meaning:"Nửa",on:["はん"],kun:[],vocab:[{w:"半分",r:"はんぶん",m:"nửa phần"},{w:"～時半",r:"～じはん",m:"...giờ rưỡi"}]},
    { char:"間",viet:"GIAN",meaning:"Khoảng / Giữa",on:["かん"],kun:["あいだ・ま"],vocab:[{w:"時間",r:"じかん",m:"thời gian"},{w:"昼間",r:"ひるま",m:"ban ngày"},{w:"間",r:"あいだ/ま",m:"khoảng/giữa"}]},
    { char:"週",viet:"CHU",meaning:"Tuần",on:["しゅう"],kun:[],vocab:[{w:"今週",r:"こんしゅう",m:"tuần này"},{w:"週",r:"しゅう",m:"tuần"}]},
  ]},
  { id:7, name:"第７課：Trường học", color:"#9b59b6", kanji:[
    { char:"学",viet:"HỌC",meaning:"Học",on:["がく・がっ"],kun:[],vocab:[{w:"学生",r:"がくせい",m:"học sinh"},{w:"学校",r:"がっこう",m:"trường học"}]},
    { char:"生",viet:"SINH",meaning:"Sinh / Sống",on:["せい"],kun:["う"],vocab:[{w:"先生",r:"せんせい",m:"giáo viên"},{w:"学生",r:"がくせい",m:"học sinh"},{w:"生まれます",r:"うまれます",m:"được sinh ra"}]},
    { char:"先",viet:"TIÊN",meaning:"Trước / Phía trước",on:["せん"],kun:[],vocab:[{w:"先生",r:"せんせい",m:"giáo viên"},{w:"先月",r:"せんげつ",m:"tháng trước"}]},
    { char:"友",viet:"HỮU",meaning:"Bạn bè",on:[],kun:["とも"],vocab:[{w:"友達",r:"ともだち",m:"bạn bè"}]},
    { char:"名",viet:"DANH",meaning:"Tên / Danh tiếng",on:["めい"],kun:["な"],vocab:[{w:"有名",r:"ゆうめい",m:"nổi tiếng"},{w:"名前",r:"なまえ",m:"tên"}]},
  ]},
  { id:8, name:"第８課：Tính từ (1)", color:"#c0392b", kanji:[
    { char:"大",viet:"ĐẠI",meaning:"To lớn",on:["だい・たい"],kun:["おお"],vocab:[{w:"大好き",r:"だいすき",m:"rất thích"},{w:"大学",r:"だいがく",m:"đại học"},{w:"大きい",r:"おおきい",m:"to"},{w:"大人",r:"おとな",m:"người lớn"}]},
    { char:"小",viet:"TIỂU",meaning:"Nhỏ bé",on:["しょう"],kun:["ちい"],vocab:[{w:"小学生",r:"しょうがくせい",m:"học sinh tiểu học"},{w:"小さい",r:"ちいさい",m:"nhỏ"}]},
    { char:"字",viet:"TỰ",meaning:"Chữ",on:["じ"],kun:[],vocab:[{w:"ローマ字",r:"ローマじ",m:"chữ La-tinh"},{w:"漢字",r:"かんじ",m:"chữ Hán"}]},
    { char:"本",viet:"BẢN",meaning:"Sách / Gốc",on:["ほん"],kun:[],vocab:[{w:"本",r:"ほん",m:"quyển sách"},{w:"日本",r:"にほん",m:"Nhật Bản"}]},
    { char:"校",viet:"HIỆU",meaning:"Trường học",on:["こう"],kun:[],vocab:[{w:"学校",r:"がっこう",m:"trường học"},{w:"高校生",r:"こうこうせい",m:"học sinh THPT"}]},
  ]},
  { id:9, name:"第９課：Du lịch", color:"#27ae60", kanji:[
    { char:"行",viet:"HÀNH",meaning:"Đi",on:["こう"],kun:["い"],vocab:[{w:"旅行",r:"りょこう",m:"du lịch"},{w:"銀行",r:"ぎんこう",m:"ngân hàng"},{w:"行きます",r:"いきます",m:"đi"}]},
    { char:"来",viet:"LAI",meaning:"Đến / Tới",on:["らい"],kun:["き"],vocab:[{w:"来週",r:"らいしゅう",m:"tuần sau"},{w:"来ます",r:"きます",m:"đến"}]},
    { char:"帰",viet:"QUY",meaning:"Về",on:[],kun:["かえ"],vocab:[{w:"帰ります",r:"かえります",m:"về nhà"}]},
    { char:"国",viet:"QUỐC",meaning:"Đất nước",on:["こく"],kun:["くに"],vocab:[{w:"韓国",r:"かんこく",m:"Hàn Quốc"},{w:"国",r:"くに",m:"đất nước"}]},
    { char:"人",viet:"NHÂN",meaning:"Người",on:["じん・にん"],kun:["ひと"],vocab:[{w:"日本人",r:"にほんじん",m:"người Nhật"},{w:"四人",r:"よにん",m:"4 người"},{w:"人",r:"ひと",m:"người"},{w:"一人",r:"ひとり",m:"một mình"}]},
  ]},
  { id:10, name:"第１０課：Gia đình", color:"#8e44ad", kanji:[
    { char:"父",viet:"PHỤ",meaning:"Cha / Bố",on:["ふ"],kun:["ちち"],vocab:[{w:"祖父",r:"そふ",m:"ông nội/ngoại"},{w:"父",r:"ちち",m:"bố (của tôi)"},{w:"お父さん",r:"おとうさん",m:"bố (kính ngữ)"}]},
    { char:"母",viet:"MẪU",meaning:"Mẹ",on:["ぼ"],kun:["はは"],vocab:[{w:"祖母",r:"そぼ",m:"bà nội/ngoại"},{w:"母",r:"はは",m:"mẹ (của tôi)"},{w:"お母さん",r:"おかあさん",m:"mẹ (kính ngữ)"}]},
    { char:"子",viet:"TỬ",meaning:"Con / Trẻ em",on:["し"],kun:["こ"],vocab:[{w:"女子",r:"じょし",m:"nữ sinh"},{w:"子供",r:"こども",m:"trẻ con"},{w:"女の子",r:"おんなのこ",m:"con gái"}]},
    { char:"男",viet:"NAM",meaning:"Nam / Đàn ông",on:["だん・なん"],kun:["おとこ"],vocab:[{w:"男子",r:"だんし",m:"nam sinh"},{w:"男の人",r:"おとこのひと",m:"người đàn ông"}]},
    { char:"女",viet:"NỮ",meaning:"Nữ / Phụ nữ",on:["じょ"],kun:["おんな"],vocab:[{w:"女性",r:"じょせい",m:"phụ nữ"},{w:"彼女",r:"かのじょ",m:"cô ấy / bạn gái"},{w:"女の人",r:"おんなのひと",m:"người phụ nữ"}]},
  ]},
  { id:11, name:"第１１課：Phương hướng (1)", color:"#16a085", kanji:[
    { char:"上",viet:"THƯỢNG",meaning:"Trên / Phía trên",on:["じょう"],kun:["うえ"],vocab:[{w:"上手",r:"じょうず",m:"giỏi"},{w:"屋上",r:"おくじょう",m:"sân thượng"},{w:"上",r:"うえ",m:"trên"}]},
    { char:"下",viet:"HẠ",meaning:"Dưới / Phía dưới",on:["か"],kun:["した"],vocab:[{w:"地下鉄",r:"ちかてつ",m:"tàu điện ngầm"},{w:"下",r:"した",m:"dưới"},{w:"下手",r:"へた",m:"vụng về"}]},
    { char:"右",viet:"HỮU",meaning:"Phải",on:[],kun:["みぎ"],vocab:[{w:"右",r:"みぎ",m:"phải"},{w:"右手",r:"みぎて",m:"tay phải"}]},
    { char:"左",viet:"TẢ",meaning:"Trái",on:[],kun:["ひだり"],vocab:[{w:"左",r:"ひだり",m:"trái"},{w:"左側",r:"ひだりがわ",m:"phía trái"}]},
    { char:"中",viet:"TRUNG",meaning:"Giữa / Trong",on:["ちゅう・じゅう"],kun:["なか"],vocab:[{w:"中学生",r:"ちゅうがくせい",m:"học sinh THCS"},{w:"一日中",r:"いちにちじゅう",m:"cả ngày"},{w:"中",r:"なか",m:"bên trong"}]},
  ]},
  { id:12, name:"第１２課：Địa điểm (1)", color:"#2980b9", kanji:[
    { char:"前",viet:"TIỀN",meaning:"Trước",on:["ぜん"],kun:["まえ"],vocab:[{w:"午前",r:"ごぜん",m:"buổi sáng (AM)"},{w:"前",r:"まえ",m:"trước"},{w:"名前",r:"なまえ",m:"tên"}]},
    { char:"後",viet:"HẬU",meaning:"Sau",on:["ご"],kun:["うし"],vocab:[{w:"午後",r:"ごご",m:"buổi chiều (PM)"},{w:"後ろ",r:"うしろ",m:"phía sau"}]},
    { char:"外",viet:"NGOẠI",meaning:"Ngoài",on:["がい"],kun:["そと"],vocab:[{w:"外国",r:"がいこく",m:"nước ngoài"},{w:"外",r:"そと",m:"bên ngoài"}]},
    { char:"入",viet:"NHẬP",meaning:"Vào / Nhập",on:["にゅう"],kun:["はい・い"],vocab:[{w:"入院する",r:"にゅういんする",m:"nhập viện"},{w:"入ります",r:"はいります",m:"vào"},{w:"入れます",r:"いれます",m:"cho vào"}]},
    { char:"出",viet:"XUẤT",meaning:"Ra / Xuất",on:["しゅつ・しゅっ"],kun:["で・だ"],vocab:[{w:"出張します",r:"しゅっちょうします",m:"đi công tác"},{w:"出ます",r:"でます",m:"ra"},{w:"出します",r:"だします",m:"lấy ra"}]},
  ]},
  { id:13, name:"第１３課：Phương hướng (2)", color:"#d35400", kanji:[
    { char:"南",viet:"NAM",meaning:"Nam / Phía Nam",on:["なん"],kun:["みなみ"],vocab:[{w:"南部",r:"なんぶ",m:"miền Nam"},{w:"南",r:"みなみ",m:"phía Nam"}]},
    { char:"西",viet:"TÂY",meaning:"Tây / Phía Tây",on:["せい"],kun:["にし"],vocab:[{w:"西部",r:"せいぶ",m:"miền Tây"},{w:"西",r:"にし",m:"phía Tây"}]},
    { char:"東",viet:"ĐÔNG",meaning:"Đông / Phía Đông",on:["とう"],kun:["ひがし"],vocab:[{w:"東京",r:"とうきょう",m:"Tokyo"},{w:"東",r:"ひがし",m:"phía Đông"}]},
    { char:"北",viet:"BẮC",meaning:"Bắc / Phía Bắc",on:["ほく"],kun:["きた"],vocab:[{w:"北部",r:"ほくぶ",m:"miền Bắc"},{w:"北",r:"きた",m:"phía Bắc"}]},
    { char:"方",viet:"PHƯƠNG",meaning:"Phương / Hướng",on:[],kun:["かた・がた"],vocab:[{w:"夕方",r:"ゆうがた",m:"chiều tối"},{w:"読み方",r:"よみかた",m:"cách đọc"},{w:"使い方",r:"つかいかた",m:"cách dùng"}]},
  ]},
  { id:14, name:"第１４課：Bộ phận cơ thể", color:"#7f8c8d", kanji:[
    { char:"口",viet:"KHẨU",meaning:"Miệng",on:[],kun:["くち"],vocab:[{w:"口",r:"くち",m:"miệng"},{w:"入り口",r:"いりぐち",m:"lối vào"},{w:"口紅",r:"くちべに",m:"son môi"}]},
    { char:"目",viet:"MỤC",meaning:"Mắt",on:[],kun:["め"],vocab:[{w:"目",r:"め",m:"mắt"}]},
    { char:"耳",viet:"NHĨ",meaning:"Tai",on:[],kun:["みみ"],vocab:[{w:"耳",r:"みみ",m:"tai"}]},
    { char:"手",viet:"THỦ",meaning:"Tay",on:["しゅ"],kun:["て"],vocab:[{w:"歌手",r:"かしゅ",m:"ca sĩ"},{w:"手",r:"て",m:"tay"},{w:"手紙",r:"てがみ",m:"thư"},{w:"上手",r:"じょうず",m:"giỏi"},{w:"お手洗い",r:"おてあらい",m:"nhà vệ sinh"}]},
    { char:"足",viet:"TÚC",meaning:"Chân",on:[],kun:["あし"],vocab:[{w:"足",r:"あし",m:"chân"}]},
  ]},
  { id:15, name:"第１５課：Động vật", color:"#6c3483", kanji:[
    { char:"牛",viet:"NGƯU",meaning:"Bò",on:["ぎゅう"],kun:["うし"],vocab:[{w:"牛乳",r:"ぎゅうにゅう",m:"sữa bò"},{w:"牛肉",r:"ぎゅうにく",m:"thịt bò"},{w:"牛",r:"うし",m:"con bò"}]},
    { char:"魚",viet:"NGƯ",meaning:"Cá",on:[],kun:["さかな"],vocab:[{w:"魚",r:"さかな",m:"cá"}]},
    { char:"犬",viet:"KHUYỂN",meaning:"Chó",on:[],kun:["いぬ"],vocab:[{w:"犬",r:"いぬ",m:"con chó"}]},
    { char:"鳥",viet:"ĐIỂU",meaning:"Chim",on:[],kun:["とり"],vocab:[{w:"鳥",r:"とり",m:"con chim"}]},
    { char:"馬",viet:"MÃ",meaning:"Ngựa",on:[],kun:["うま"],vocab:[{w:"馬",r:"うま",m:"con ngựa"}]},
  ]},
  { id:16, name:"第１６課：Thiên nhiên (1)", color:"#148f77", kanji:[
    { char:"山",viet:"SƠN",meaning:"Núi",on:["さん・ざん"],kun:["やま"],vocab:[{w:"富士山",r:"ふじさん",m:"núi Phú Sĩ"},{w:"火山",r:"かざん",m:"núi lửa"},{w:"山",r:"やま",m:"núi"}]},
    { char:"川",viet:"XUYÊN",meaning:"Sông",on:[],kun:["かわ"],vocab:[{w:"川",r:"かわ",m:"sông"}]},
    { char:"田",viet:"ĐIỀN",meaning:"Ruộng",on:[],kun:["た"],vocab:[{w:"田中さん",r:"たなかさん",m:"họ Tanaka"},{w:"田舎",r:"いなか",m:"vùng quê"}]},
    { char:"海",viet:"HẢI",meaning:"Biển",on:["かい"],kun:["うみ"],vocab:[{w:"海外",r:"かいがい",m:"nước ngoài"},{w:"海",r:"うみ",m:"biển"}]},
    { char:"空",viet:"KHÔNG",meaning:"Bầu trời",on:["くう"],kun:["そら"],vocab:[{w:"空気",r:"くうき",m:"không khí"},{w:"空",r:"そら",m:"bầu trời"}]},
  ]},
  { id:17, name:"第１７課：Thiên nhiên (2)", color:"#1a5276", kanji:[
    { char:"花",viet:"HOA",meaning:"Hoa",on:["か"],kun:["はな"],vocab:[{w:"花瓶",r:"かびん",m:"lọ hoa"},{w:"花",r:"はな",m:"hoa"},{w:"お花見",r:"おはなみ",m:"ngắm hoa"},{w:"花火",r:"はなび",m:"pháo hoa"}]},
    { char:"雨",viet:"VŨ",meaning:"Mưa",on:[],kun:["あめ・あま"],vocab:[{w:"雨",r:"あめ",m:"mưa"},{w:"大雨",r:"おおあめ",m:"mưa to"},{w:"雨戸",r:"あまど",m:"cửa chắn mưa"}]},
    { char:"天",viet:"THIÊN",meaning:"Trời",on:["てん"],kun:[],vocab:[{w:"天気",r:"てんき",m:"thời tiết"},{w:"天ぷら",r:"てんぷら",m:"món tempura"}]},
    { char:"員",viet:"VIÊN",meaning:"Thành viên",on:["いん"],kun:[],vocab:[{w:"会社員",r:"かいしゃいん",m:"nhân viên công ty"},{w:"銀行員",r:"ぎんこういん",m:"nhân viên ngân hàng"}]},
    { char:"者",viet:"GIẢ",meaning:"Người / Kẻ",on:["しゃ"],kun:[],vocab:[{w:"研究者",r:"けんきゅうしゃ",m:"nhà nghiên cứu"}]},
  ]},
  { id:18, name:"第１８課：Động từ (1)", color:"#4a235a", kanji:[
    { char:"見",viet:"KIẾN",meaning:"Nhìn / Thấy",on:["けん"],kun:["み"],vocab:[{w:"見学",r:"けんがく",m:"tham quan học tập"},{w:"見ます",r:"みます",m:"nhìn"},{w:"花見",r:"はなみ",m:"ngắm hoa"}]},
    { char:"聞",viet:"VĂN",meaning:"Nghe / Hỏi",on:["ぶん"],kun:["き"],vocab:[{w:"新聞",r:"しんぶん",m:"báo"},{w:"聞きます",r:"ききます",m:"nghe / hỏi"}]},
    { char:"書",viet:"THƯ",meaning:"Viết",on:["しょ"],kun:["か・がき"],vocab:[{w:"図書館",r:"としょかん",m:"thư viện"},{w:"書きます",r:"かきます",m:"viết"},{w:"葉書",r:"はがき",m:"bưu thiếp"}]},
    { char:"食",viet:"THỰC",meaning:"Ăn",on:["しょく"],kun:["た"],vocab:[{w:"食堂",r:"しょくどう",m:"nhà ăn"},{w:"食べ物",r:"たべもの",m:"đồ ăn"},{w:"食べます",r:"たべます",m:"ăn"}]},
    { char:"飲",viet:"ẨM",meaning:"Uống",on:[],kun:["の"],vocab:[{w:"飲みます",r:"のみます",m:"uống"},{w:"飲み物",r:"のみもの",m:"đồ uống"}]},
  ]},
  { id:19, name:"第１９課：Động từ (2)", color:"#117864", kanji:[
    { char:"買",viet:"MÃI",meaning:"Mua",on:[],kun:["か"],vocab:[{w:"買います",r:"かいます",m:"mua"},{w:"買い物",r:"かいもの",m:"mua sắm"}]},
    { char:"言",viet:"NGÔN",meaning:"Nói",on:[],kun:["い・こと"],vocab:[{w:"言います",r:"いいます",m:"nói"},{w:"言葉",r:"ことば",m:"ngôn ngữ / từ"}]},
    { char:"読",viet:"ĐỌC",meaning:"Đọc",on:[],kun:["よ"],vocab:[{w:"読みます",r:"よみます",m:"đọc"}]},
    { char:"話",viet:"THOẠI",meaning:"Nói chuyện",on:["わ"],kun:["はな・はなし"],vocab:[{w:"電話",r:"でんわ",m:"điện thoại"},{w:"話します",r:"はなします",m:"nói chuyện"},{w:"話",r:"はなし",m:"câu chuyện"}]},
    { char:"休",viet:"HƯU",meaning:"Nghỉ",on:[],kun:["やす"],vocab:[{w:"休みます",r:"やすみます",m:"nghỉ"}]},
  ]},
  { id:20, name:"第２０課：Tính từ (2)", color:"#c0392b", kanji:[
    { char:"高",viet:"CAO",meaning:"Cao / Đắt",on:["こう"],kun:["たか"],vocab:[{w:"高校生",r:"こうこうせい",m:"học sinh THPT"},{w:"高い",r:"たかい",m:"cao / đắt"}]},
    { char:"安",viet:"AN",meaning:"Rẻ / An toàn",on:[],kun:["やす"],vocab:[{w:"安い",r:"やすい",m:"rẻ"}]},
    { char:"長",viet:"TRƯỞNG",meaning:"Dài / Trưởng",on:["ちょう"],kun:["なが"],vocab:[{w:"社長",r:"しゃちょう",m:"giám đốc"},{w:"長い",r:"ながい",m:"dài"}]},
    { char:"気",viet:"KHÍ",meaning:"Khí / Tinh thần",on:["き"],kun:[],vocab:[{w:"天気",r:"てんき",m:"thời tiết"},{w:"元気",r:"げんき",m:"khỏe mạnh"}]},
    { char:"元",viet:"NGUYÊN",meaning:"Nguồn / Gốc",on:["げん"],kun:[],vocab:[{w:"元気",r:"げんき",m:"khỏe mạnh"}]},
  ]},
  { id:21, name:"第２１課：Tính từ (3)", color:"#6c3483", kanji:[
    { char:"新",viet:"TÂN",meaning:"Mới",on:["しん"],kun:["あたら"],vocab:[{w:"新聞",r:"しんぶん",m:"báo"},{w:"新しい",r:"あたらしい",m:"mới"}]},
    { char:"古",viet:"CỔ",meaning:"Cũ",on:[],kun:["ふる"],vocab:[{w:"古い",r:"ふるい",m:"cũ"}]},
    { char:"少",viet:"THIỂU",meaning:"Ít",on:["しょう"],kun:["すこ・すく"],vocab:[{w:"少々",r:"しょうしょう",m:"một chút (lịch sự)"},{w:"少し",r:"すこし",m:"một chút"},{w:"少ない",r:"すくない",m:"ít"}]},
    { char:"多",viet:"ĐA",meaning:"Nhiều",on:["た"],kun:["おお"],vocab:[{w:"多分",r:"たぶん",m:"có lẽ"},{w:"多い",r:"おおい",m:"nhiều"}]},
    { char:"明",viet:"MINH",meaning:"Sáng / Rõ",on:["めい"],kun:["あ・あか"],vocab:[{w:"説明",r:"せつめい",m:"giải thích"},{w:"明るい",r:"あかるい",m:"sáng"},{w:"明日",r:"あした",m:"ngày mai"}]},
  ]},
  { id:22, name:"第２２課：Đồ ăn", color:"#e74c3c", kanji:[
    { char:"米",viet:"MÊ",meaning:"Gạo",on:[],kun:["こめ"],vocab:[{w:"米",r:"こめ",m:"gạo"}]},
    { char:"肉",viet:"NHỤC",meaning:"Thịt",on:["にく"],kun:[],vocab:[{w:"牛肉",r:"ぎゅうにく",m:"thịt bò"},{w:"鶏肉",r:"とりにく",m:"thịt gà"}]},
    { char:"茶",viet:"TRÀ",meaning:"Trà",on:["ちゃ・さ"],kun:[],vocab:[{w:"お茶",r:"おちゃ",m:"trà"},{w:"喫茶店",r:"きっさてん",m:"quán cà phê"},{w:"茶道",r:"さどう",m:"trà đạo"}]},
    { char:"物",viet:"VẬT",meaning:"Vật / Đồ vật",on:["ぶつ・もつ"],kun:["もの"],vocab:[{w:"動物",r:"どうぶつ",m:"động vật"},{w:"荷物",r:"にもつ",m:"hành lý"},{w:"食べ物",r:"たべもの",m:"đồ ăn"},{w:"着物",r:"きもの",m:"kimono"}]},
    { char:"好",viet:"HẢO",meaning:"Thích",on:[],kun:["す・この"],vocab:[{w:"好き",r:"すき",m:"thích"},{w:"お好み焼き",r:"おこのみやき",m:"bánh xèo Nhật"}]},
  ]},
  { id:23, name:"第２３課：Phương tiện", color:"#2c3e50", kanji:[
    { char:"電",viet:"ĐIỆN",meaning:"Điện",on:["でん"],kun:[],vocab:[{w:"電車",r:"でんしゃ",m:"tàu điện"},{w:"電話",r:"でんわ",m:"điện thoại"}]},
    { char:"車",viet:"XA",meaning:"Xe",on:["しゃ"],kun:["くるま"],vocab:[{w:"自転車",r:"じてんしゃ",m:"xe đạp"},{w:"車",r:"くるま",m:"xe ô tô"}]},
    { char:"自",viet:"TỰ",meaning:"Tự / Bản thân",on:["じ"],kun:[],vocab:[{w:"自己紹介",r:"じこしょうかい",m:"tự giới thiệu"},{w:"自分",r:"じぶん",m:"bản thân"}]},
    { char:"寺",viet:"TỰ",meaning:"Chùa",on:["じ"],kun:["てら"],vocab:[{w:"金閣寺",r:"きんかくじ",m:"chùa Kinkaku"},{w:"お寺",r:"おてら",m:"chùa"}]},
    { char:"町",viet:"ĐINH",meaning:"Thị trấn",on:[],kun:["まち"],vocab:[{w:"町",r:"まち",m:"thị trấn / phố"}]},
  ]},
  { id:24, name:"第２４課：Địa điểm (2)", color:"#1a5276", kanji:[
    { char:"会",viet:"HỘI",meaning:"Gặp / Hội",on:["かい"],kun:["あ"],vocab:[{w:"会社",r:"かいしゃ",m:"công ty"},{w:"会います",r:"あいます",m:"gặp"}]},
    { char:"社",viet:"XÃ",meaning:"Công ty / Đền thờ",on:["しゃ"],kun:[],vocab:[{w:"会社",r:"かいしゃ",m:"công ty"},{w:"神社",r:"じんじゃ",m:"đền thờ Thần đạo"},{w:"社長",r:"しゃちょう",m:"giám đốc"}]},
    { char:"病",viet:"BỆNH",meaning:"Bệnh",on:["びょう"],kun:[],vocab:[{w:"病院",r:"びょういん",m:"bệnh viện"},{w:"病気",r:"びょうき",m:"bệnh tật"}]},
    { char:"院",viet:"VIỆN",meaning:"Viện / Cơ sở",on:["いん"],kun:[],vocab:[{w:"入院する",r:"にゅういんする",m:"nhập viện"},{w:"病院",r:"びょういん",m:"bệnh viện"}]},
    { char:"店",viet:"ĐIẾM",meaning:"Cửa hàng",on:["てん"],kun:["みせ"],vocab:[{w:"喫茶店",r:"きっさてん",m:"quán cà phê"},{w:"店",r:"みせ",m:"cửa hàng"}]},
  ]},
  { id:25, name:"第２５課：Thời gian (4)", color:"#117864", kanji:[
    { char:"毎",viet:"MỖI",meaning:"Mỗi",on:["まい"],kun:[],vocab:[{w:"毎朝",r:"まいあさ",m:"mỗi sáng"},{w:"毎日",r:"まいにち",m:"mỗi ngày"}]},
    { char:"回",viet:"HỒI",meaning:"Lần / Vòng",on:["かい"],kun:["まわ"],vocab:[{w:"一回",r:"いっかい",m:"một lần"},{w:"回します",r:"まわします",m:"xoay"}]},
    { char:"午",viet:"NGỌ",meaning:"Ngọ (12 giờ trưa)",on:["ご"],kun:[],vocab:[{w:"午前",r:"ごぜん",m:"buổi sáng (AM)"},{w:"午後",r:"ごご",m:"buổi chiều (PM)"}]},
    { char:"同",viet:"ĐỒNG",meaning:"Giống / Cùng",on:[],kun:["おな"],vocab:[{w:"同じ",r:"おなじ",m:"giống nhau"}]},
    { char:"立",viet:"LẬP",meaning:"Đứng",on:[],kun:["た"],vocab:[{w:"立ちます",r:"たちます",m:"đứng"},{w:"役に立つ",r:"やくにたつ",m:"có ích"}]},
  ]},
  { id:26, name:"第２６課：Nâng cao", color:"#4a235a", kanji:[
    { char:"内",viet:"NỘI",meaning:"Bên trong / Nội",on:["ない"],kun:[],vocab:[{w:"国内",r:"こくない",m:"trong nước"},{w:"家内",r:"かない",m:"vợ (khiêm tốn)"}]},
    { char:"暗",viet:"ÁM",meaning:"Tối",on:[],kun:["くら"],vocab:[{w:"暗い",r:"くらい",m:"tối"}]},
    { char:"仕",viet:"SĨ",meaning:"Phục vụ",on:["し・じ"],kun:[],vocab:[{w:"仕事",r:"しごと",m:"công việc"},{w:"仕方",r:"しかた",m:"cách làm"}]},
    { char:"事",viet:"SỰ",meaning:"Việc / Sự",on:["じ"],kun:["こと"],vocab:[{w:"食事",r:"しょくじ",m:"bữa ăn"},{w:"用事",r:"ようじ",m:"việc cần làm"},{w:"お大事",r:"おだいじ",m:"giữ gìn sức khoẻ"},{w:"仕事",r:"しごと",m:"công việc"}]},
    { char:"力",viet:"LỰC",meaning:"Sức mạnh",on:["りょく"],kun:["ちから"],vocab:[{w:"能力",r:"のうりょく",m:"năng lực"},{w:"力",r:"ちから",m:"sức mạnh"}]},
  ]},
];

function shuffle(a){return[...a].sort(()=>Math.random()-.5)}
function pickDistinct(pool,n,exc){const u=[...new Set(pool.filter(x=>x!==exc))];return shuffle(u).slice(0,n)}

function makeQuestions(lessons){
  const qs=[];
  const allOn=lessons.flatMap(l=>l.kanji.filter(k=>k.on.length>0).map(k=>k.on[0]));
  const allKun=lessons.flatMap(l=>l.kanji.filter(k=>k.kun.length>0).map(k=>k.kun[0]));
  const allR=lessons.flatMap(l=>l.kanji.flatMap(k=>k.vocab.map(v=>v.r)));
  const allM=lessons.flatMap(l=>l.kanji.map(k=>k.meaning));
  lessons.forEach(lesson=>{
    lesson.kanji.forEach(k=>{
      const base={lesson:lesson.id,char:k.char,lc:lesson.color};
      if(k.on.length>0){const c=k.on[0];const o=shuffle([c,...pickDistinct(allOn,3,c)]).slice(0,4);qs.push({...base,id:`${lesson.id}${k.char}on`,type:"on",q:`${k.char} — Âm ON đọc là gì?`,opts:o,ans:c});}
      if(k.kun.length>0){const c=k.kun[0];const o=shuffle([c,...pickDistinct(allKun,3,c)]).slice(0,4);qs.push({...base,id:`${lesson.id}${k.char}kun`,type:"kun",q:`${k.char} — Âm KUN đọc là gì?`,opts:o,ans:c});}
      k.vocab.slice(0,2).forEach((v,i)=>{const o=shuffle([v.r,...pickDistinct(allR,3,v.r)]).slice(0,4);qs.push({...base,id:`${lesson.id}${k.char}v${i}`,type:"vocab",q:`「${v.w}」đọc là gì? (${v.m})`,opts:o,ans:v.r});});
      {const c=k.meaning;const o=shuffle([c,...pickDistinct(allM,3,c)]).slice(0,4);qs.push({...base,id:`${lesson.id}${k.char}m`,type:"meaning",q:`${k.char} có nghĩa là gì?`,opts:o,ans:c});}
    });
  });
  return shuffle(qs);
}

const TL={on:"音読み",kun:"訓読み",vocab:"語彙",meaning:"意味"};
const TC={on:"#e67e22",kun:"#9b59b6",vocab:"#3498db",meaning:"#27ae60"};

export default function Kanji(){
  const [screen,setScreen]=useState("home");
  const [selL,setSelL]=useState(null);
  const [studyL,setStudyL]=useState(null);
  const [qs,setQs]=useState([]);
  const [cur,setCur]=useState(0);
  const [answers,setAnswers]=useState({});
  const [sel,setSel]=useState(null);
  const [fb,setFb]=useState(false);
  const [score,setScore]=useState(0);
  const [filter,setFilter]=useState(null);// null=all, number=lesson group

  function startExam(lid){
    const src=lid==null?LESSONS:LESSONS.filter(l=>l.id===lid);
    setSelL(lid);setQs(makeQuestions(src));
    setCur(0);setAnswers({});setSel(null);setFb(false);setScore(0);
    setScreen("exam");
  }
  function pick(opt){
    if(fb)return;
    const q=qs[cur];setSel(opt);setFb(true);
    if(opt===q.ans)setScore(s=>s+1);
    setAnswers(a=>({...a,[q.id]:opt}));
  }
  function next(){if(cur+1>=qs.length)setScreen("result");else{setCur(c=>c+1);setSel(null);setFb(false);}}

  const q=qs[cur];
  const li=selL?LESSONS.find(l=>l.id===selL):null;
  const pct=qs.length>0?Math.round((score/qs.length)*100):0;
  const gc=pct>=90?"#2ecc71":pct>=70?"#f39c12":"#e74c3c";
  const grade=pct>=90?"優秀":pct>=70?"合格":"不合格";
  const wrongs=qs.filter(q=>answers[q.id]!==q.ans);

  const groups=[
    {label:"Số đếm",ids:[1,2,3],color:"#e74c3c"},
    {label:"Thời gian",ids:[4,5,6,25],color:"#2ecc71"},
    {label:"Trường học",ids:[7,8],color:"#9b59b6"},
    {label:"Du lịch & Gia đình",ids:[9,10],color:"#3498db"},
    {label:"Phương hướng & Địa điểm",ids:[11,12,13],color:"#27ae60"},
    {label:"Cơ thể & Động vật",ids:[14,15],color:"#e67e22"},
    {label:"Thiên nhiên",ids:[16,17],color:"#1abc9c"},
    {label:"Động từ",ids:[18,19],color:"#8e44ad"},
    {label:"Tính từ",ids:[20,21],color:"#c0392b"},
    {label:"Đồ ăn & Phương tiện",ids:[22,23],color:"#d35400"},
    {label:"Địa điểm 2 & Nâng cao",ids:[24,26],color:"#2980b9"},
  ];

  const visLessons=filter==null?LESSONS:LESSONS.filter(l=>groups[filter].ids.includes(l.id));

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0f0c29,#302b63,#24243e)",fontFamily:"'Noto Sans JP',sans-serif",color:"#fff"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .btn{cursor:pointer;border:none;border-radius:12px;font-family:inherit;font-weight:700;transition:all .17s}
        .btn:hover{transform:translateY(-2px);filter:brightness(1.12)}.btn:active{transform:translateY(0)}
        .lc{cursor:pointer;border-radius:14px;border:2px solid transparent;background:rgba(255,255,255,.06);transition:all .17s;padding:12px 16px}
        .lc:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.3);background:rgba(255,255,255,.12)}
        .opt{display:block;width:100%;text-align:left;padding:13px 18px;margin:7px 0;background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.14);border-radius:12px;color:#fff;font-size:15px;cursor:pointer;transition:all .17s;font-family:inherit}
        .opt:hover:not(.dis){background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.4);transform:translateX(4px)}
        .opt.ok{background:rgba(46,204,113,.22)!important;border-color:#2ecc71!important}
        .opt.ng{background:rgba(231,76,60,.22)!important;border-color:#e74c3c!important}
        .opt.dis{cursor:default}
        .fd{animation:fi .27s ease}@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .vr{display:flex;gap:10px;align-items:baseline;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.08)}
        .tag{cursor:pointer;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;border:2px solid transparent;transition:all .15s}
        .tag:hover{filter:brightness(1.2)}
        .kanji-content{max-width:700px;margin:0 auto;padding:28px 16px}
        .kanji-lesson-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}
        .kanji-study-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:10px}
        .kanji-card-row{display:flex;gap:18px;align-items:flex-start;margin-bottom:14px;flex-wrap:wrap}
        .kanji-card-row>div:first-child{min-width:80px}
        .kanji-exam-container,.kanji-result-container{max-width:100%;margin:0 auto;padding:26px 16px}
        .kanji-buttons{display:flex;gap:10px;flex-wrap:wrap}
        .kanji-buttons .btn{flex:1;min-width:140px}
        @media (max-width:720px){.kanji-content{padding:20px 14px}.kanji-study-header{flex-direction:column;align-items:flex-start}.kanji-card-row{flex-direction:column}.kanji-card-row>div:first-child{width:100%}.kanji-buttons{flex-direction:column}.kanji-buttons .btn{width:100%}.kanji-lesson-grid{grid-template-columns:repeat(auto-fit,minmax(140px,1fr))}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:3px}
      `}</style>

      {/* HOME */}
      {screen==="home"&&(
        <div className="kanji-content">
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:52,marginBottom:6}}>漢字</div>
            <h1 style={{fontSize:22,letterSpacing:2,color:"#f1c40f",marginBottom:4}}>KANJI N5 — BÀI KIỂM TRA</h1>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:13}}>26 bài · 5 kanji/bài · âm ON · âm KUN · từ vựng · ý nghĩa</p>
          </div>

          {/* ôn bài */}
          <div style={{background:"rgba(255,255,255,.07)",borderRadius:18,padding:20,marginBottom:16,border:"1px solid rgba(255,255,255,.13)"}}>
            <div style={{fontSize:12,color:"#f1c40f",letterSpacing:1,marginBottom:12,fontWeight:700}}>📖 ÔN BÀI</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:10}} className="kanji-tag-row">
              {groups.map((g,gi)=>(
                <button key={gi} className="tag" style={{background:filter===gi?g.color:"rgba(255,255,255,.1)",borderColor:filter===gi?g.color:"transparent"}} onClick={()=>setFilter(filter===gi?null:gi)}>
                  {g.label}
                </button>
              ))}
            </div>
            <div className="kanji-lesson-grid">
              {visLessons.map(l=>(
                <button key={l.id} className="lc btn" style={{borderLeft:`4px solid ${l.color}`,textAlign:"left"}} onClick={()=>{setStudyL(l);setScreen("study");}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:3}}>第{l.id}課</div>
                  <div style={{fontSize:18,letterSpacing:-1,fontWeight:900,color:l.color}}>{l.kanji.map(k=>k.char).join(" ")}</div>
                </button>
              ))}
            </div>
          </div>

          {/* thi */}
          <div style={{background:"rgba(255,255,255,.07)",borderRadius:18,padding:20,border:"1px solid rgba(255,255,255,.13)"}}>
            <div style={{fontSize:12,color:"#f1c40f",letterSpacing:1,marginBottom:12,fontWeight:700}}>✏️ LÀM BÀI KIỂM TRA</div>
            <button className="btn lc" style={{width:"100%",marginBottom:10,borderColor:"#f1c40f",background:"rgba(241,196,15,.1)",textAlign:"left"}} onClick={()=>startExam(null)}>
              <span style={{fontSize:16,fontWeight:900}}>📚 Tổng hợp — tất cả 26 bài ({LESSONS.reduce((a,l)=>a+l.kanji.length,0)} kanji)</span>
            </button>
            {groups.map((g,gi)=>(
              <div key={gi} style={{marginBottom:12}}>
                <div style={{fontSize:12,color:g.color,fontWeight:700,marginBottom:6,paddingLeft:4}}>▸ {g.label}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {LESSONS.filter(l=>g.ids.includes(l.id)).map(l=>(
                    <button key={l.id} className="btn" style={{background:l.color+"33",border:`1px solid ${l.color}55`,color:"#fff",padding:"6px 14px",fontSize:13}} onClick={()=>startExam(l.id)}>
                      第{l.id}課 {l.kanji.map(k=>k.char).join("")}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STUDY */}
      {screen==="study"&&studyL&&(
        <div style={{maxWidth:660,margin:"0 auto",padding:"24px 16px"}}>
          <div className="kanji-study-header">
            <button className="btn" style={{background:"rgba(255,255,255,.1)",color:"#fff",padding:"7px 14px",fontSize:13}} onClick={()=>setScreen("home")}>← Trang chủ</button>
            <span style={{fontWeight:700,color:"#f1c40f",fontSize:15}}>{studyL.name}</span>
            <button className="btn" style={{background:studyL.color,color:"#fff",padding:"7px 14px",fontSize:13}} onClick={()=>startExam(studyL.id)}>Thi ngay →</button>
          </div>
          {studyL.kanji.map(k=>(
            <div key={k.char} className="fd" style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.13)",borderRadius:18,padding:20,marginBottom:14}}>
              <div className="kanji-card-row">
                <div style={{fontSize:68,fontWeight:900,lineHeight:1,color:studyL.color,textShadow:`0 4px 24px ${studyL.color}55`,minWidth:80}}>{k.char}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:2}}>{k.viet}</div>
                  <div style={{fontSize:17,fontWeight:700,marginBottom:10}}>{k.meaning}</div>
                  {k.on.length>0&&<div style={{marginBottom:7}}><span style={{background:"#e67e22",borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:700,marginRight:8}}>オン</span><span style={{fontSize:14}}>{k.on.join(" · ")}</span></div>}
                  {k.kun.length>0&&<div><span style={{background:"#9b59b6",borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:700,marginRight:8}}>くん</span><span style={{fontSize:14}}>{k.kun.join(" · ")}</span></div>}
                </div>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.38)",letterSpacing:1,marginBottom:8}}>TỪ VỰNG</div>
              {k.vocab.map((v,i)=>(
                <div key={i} className="vr">
                  <span style={{fontSize:18,fontWeight:700,minWidth:88,color:studyL.color}}>{v.w}</span>
                  <span style={{fontSize:13,color:"rgba(255,255,255,.7)",minWidth:110}}>{v.r}</span>
                  <span style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>{v.m}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* EXAM */}
      {screen==="exam"&&q&&(
        <div style={{maxWidth:560,margin:"0 auto",padding:"26px 16px"}} className="fd">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <button className="btn" style={{background:"rgba(255,255,255,.1)",color:"#fff",padding:"7px 13px",fontSize:13}} onClick={()=>setScreen("home")}>← Thoát</button>
            <span style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{li?li.name:"Tổng hợp"}</span>
            <span style={{fontWeight:700,color:"#f1c40f",fontSize:14}}>{cur+1}/{qs.length}</span>
          </div>
          <div style={{height:5,background:"rgba(255,255,255,.1)",borderRadius:99,marginBottom:18,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(cur/qs.length)*100}%`,background:"linear-gradient(90deg,#f1c40f,#e67e22)",borderRadius:99,transition:"width .3s"}}/>
          </div>
          <div style={{marginBottom:10,display:"flex",gap:8}}>
            <span style={{background:TC[q.type],borderRadius:6,padding:"3px 11px",fontSize:11,fontWeight:700}}>{TL[q.type]}</span>
            <span style={{fontSize:11,color:"rgba(255,255,255,.35)",alignSelf:"center"}}>第{q.lesson}課</span>
          </div>
          <div style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.13)",borderRadius:18,padding:"24px 22px 18px",marginBottom:16}}>
            <div style={{fontSize:56,fontWeight:900,color:q.lc,textShadow:`0 3px 20px ${q.lc}55`,marginBottom:10}}>{q.char}</div>
            <div style={{fontSize:17,fontWeight:600,lineHeight:1.5}}>{q.q}</div>
          </div>
          {q.opts.map(opt=>{
            let cls="opt";
            if(fb){cls+=" dis";if(opt===q.ans)cls+=" ok";else if(opt===sel)cls+=" ng";}
            return<button key={opt} className={cls} onClick={()=>pick(opt)}>{opt}</button>;
          })}
          {fb&&(
            <div className="fd" style={{marginTop:12}}>
              <div style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.13)",borderRadius:14,padding:"12px 16px",marginBottom:10,borderColor:sel===q.ans?"rgba(46,204,113,.4)":"rgba(231,76,60,.4)",background:sel===q.ans?"rgba(46,204,113,.1)":"rgba(231,76,60,.1)"}}>
                <div style={{fontWeight:700,color:sel===q.ans?"#2ecc71":"#e74c3c",marginBottom:sel!==q.ans?4:0}}>{sel===q.ans?"✓ Chính xác!":"✗ Sai rồi!"}</div>
                {sel!==q.ans&&<div style={{fontSize:14,color:"rgba(255,255,255,.8)"}}>Đáp án đúng: <strong>{q.ans}</strong></div>}
              </div>
              <button className="btn" onClick={next} style={{width:"100%",padding:14,background:"#f1c40f",color:"#1a1a2e",fontSize:15}}>{cur+1>=qs.length?"Xem kết quả →":"Câu tiếp →"}</button>
            </div>
          )}
        </div>
      )}

      {/* RESULT */}
      {screen==="result"&&(
        <div className="kanji-result-container fd">
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{fontSize:58,marginBottom:4}}>{pct>=90?"🏆":pct>=70?"✅":"📖"}</div>
            <div style={{fontSize:38,fontWeight:900,color:gc}}>{grade}</div>
            <div style={{color:"rgba(255,255,255,.65)",marginTop:4}}>{pct>=90?"Xuất sắc!":pct>=70?"Tốt lắm!":"Hãy ôn lại nhé!"}</div>
          </div>
          <div style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.13)",borderRadius:18,padding:22,marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-around",textAlign:"center"}}>
              {[["Đúng",score,"#2ecc71"],["Sai",qs.length-score,"#e74c3c"],["Tỉ lệ",`${pct}%`,gc]].map(([l,v,c])=>(
                <div key={l}><div style={{fontSize:38,fontWeight:900,color:c}}>{v}</div><div style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>{l}</div></div>
              ))}
            </div>
            <div style={{height:8,background:"rgba(255,255,255,.1)",borderRadius:99,margin:"16px 0 0",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${gc},${gc}88)`,borderRadius:99,transition:"width 1s"}}/>
            </div>
          </div>
          {wrongs.length>0&&(
            <div style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.13)",borderRadius:18,padding:18,marginBottom:16}}>
              <div style={{fontSize:13,color:"#e74c3c",marginBottom:12,fontWeight:700}}>❌ Cần ôn lại ({wrongs.length} câu)</div>
              {wrongs.map(wq=>(
                <div key={wq.id} style={{padding:"9px 13px",background:"rgba(231,76,60,.08)",borderRadius:10,marginBottom:7,borderLeft:`3px solid ${wq.lc}`}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:3}}>
                    <span style={{fontSize:24,fontWeight:900,color:wq.lc}}>{wq.char}</span>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>{wq.q}</span>
                  </div>
                  <div style={{fontSize:12}}>
                    <span style={{color:"#e74c3c"}}>Bạn: {answers[wq.id]||"—"}</span>
                    <span style={{margin:"0 8px",color:"rgba(255,255,255,.2)"}}>|</span>
                    <span style={{color:"#2ecc71"}}>Đúng: {wq.ans}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{display:"flex",gap:10}}>
            <button className="btn" onClick={()=>startExam(selL)} style={{flex:1,padding:14,background:"#f1c40f",color:"#1a1a2e",fontSize:15}}>🔄 Thử lại</button>
            <button className="btn" onClick={()=>setScreen("home")} style={{flex:1,padding:14,background:"rgba(255,255,255,.1)",color:"#fff",fontSize:15}}>🏠 Trang chủ</button>
          </div>
        </div>
      )}
    </div>
  );
}