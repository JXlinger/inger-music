# QQ音乐接口

>歌曲MV接口:
(```)
	url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getMvForSong3238806046735312',
	method: 'GET',
	data: {
		g_tk: 1247899168,
		loginUin: 599526934,
		hostUin: 0,
		format: 'json',
		inCharset: 'utf8',
		outCharset:'utf-8',
		notice: 0,
		platform: 'yqq.json',
		needNewCode: 0,
		data: {
			"comm": {
				"ct": 24,
				"cv": 0
			},
			"mv": {
				"module": "MvService.MvInfoProServer",
				"method": "GetMvBySongid",
				"param": {
				"mids": [that.mvid]
			}
		}
	}
}
(```)