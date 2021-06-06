export const formatTime = arg => {

  if(arg && !isNaN(arg) && arg >0) {
    return (
      (Math.floor(arg/3600)).toString().padStart(2, '0') + ':'
      + (Math.floor((arg/60)%60)).toString().padStart(2, '0') + ':'
      + (Math.floor(arg%60)).toString().padStart(2, '0')
    );
  } else {
    return null;
  }
};
