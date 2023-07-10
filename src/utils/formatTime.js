export const formatTime = function(time) {
  return time.split("T")[0] + " " + time.split("T")[1].substr(0, 8)
}