// global method to roundUp
function trueRound(value, digits){
	return ((Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits)) * 1;
}