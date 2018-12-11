const pdfmake = require('../../node_modules/pdfmake/pdfmake'),
	  vfsfonts = require('../../node_modules/pdfmake/vfsfonts'),
	  pdfMake.vfs = vfsFonts.pdfMake.vfs;

module.exports = {
	print : function(){
		
		    const fname = req.body.fname;
		    const lname = req.body.lname;

		    var documentDefinition = {
		        content: [
		            `Hello ${fname} ${lname}` ,
		            'Nice to meet you!'
		        ]        
		    };

		    const pdfDoc = pdfMake.createPdf(documentDefinition);
		    pdfDoc.getBase64((data)=>{
		        res.writeHead(200, 
		        {
		            'Content-Type': 'application/pdf',
		            'Content-Disposition':'attachment;filename="filename.pdf"'
		        });

		        const download = Buffer.from(data.toString('utf-8'), 'base64');
		        res.end(download);
		    });

     }

};