#!/bin/env node
const importFolder="/home/lff/bind/myOwnProgrammes/nodejs/require";	// https://github.com/LFF5644/node-modules
const cursor=require(importFolder+"/cursor.js");

const {LINES,COLUMNS}=process.env;
let position=[LINES,COLUMNS/2];

/*function fill(){
	const line=new Array(Number(COLUMNS))
		.fill("*")
		.join("")
	return(new Array(Number(LINES))
		.fill(line)
		.join("\n")
	);
}*/
function frame(){
	process.stdout.write(
		cursor.clear+
		//fill()+
		cursor.changePosition(position[0],position[1])+
		"\x1b[32mX\x1b[0m"
	);
}

if(!COLUMNS||!LINES){
	console.log("Variable $LINES und oder $COLUMNS nicht Definiert!");
	console.log("$LINES = "+LINES)
	console.log("$COLUMNS = "+COLUMNS);
	console.log("\nUnter Linux können sie 'export <VARNAME> eingeben.'");
	process.exit(1);
}

process.openStdin();			// don't close the Programm!
process.stdin.setRawMode(true);	// do not wait for press ENTER

process.stdin.on("data",buffer=>{
	const key=buffer.toString("utf-8");
	let update=true;
	
	if(key=="\u001b[C"){	// left "<-"
		position[1]+=1;
		if(position[1]>COLUMNS){position[1]=COLUMNS}
	}
	else if(key=="\u001b[D"){	// right "->"
		position[1]-=1;
		if(position[1]<1){position[1]=1}
	}
	else if(key=="\u001b[A"){	// up "/\"
		position[0]-=1;
		if(position[0]<1){position[0]=1}
	}
	else if(key=="\u001b[B"){	// down "\/"
		position[0]+=1;
		if(position[0]>LINES){position[0]=LINES}
	}
	else if(key=="q"||key=="\u0003"){
		console.log("Exit!");
		process.exit(0);
	}else{
		update=false;
	}

	if(update) frame();
});

frame();
