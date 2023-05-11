// next-logger.config.js
const pino = require('pino')

const logger = defaultConfig =>
  pino({
    ...defaultConfig,
    pinoPrint: {
      translateTime: "SYS:hh:MM:ss TT dd-mm-yyyy",
      errorLikeObjectKeys: ["err", "error", "details"],
      ignore: "pid,hostname,service,prefix",
      colorize: true,
    },
    mixin: () => ({ name: 'qe' }),
  })

module.exports = {
  logger,
}