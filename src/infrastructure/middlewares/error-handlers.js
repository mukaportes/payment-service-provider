/**
 * @description Sets up default Node Process events for logging purposes
 */
module.exports = () => {
  process.on('unhandledRejection', (reason, processError) => {
    console.error('Unhandled rejection at Promise', reason, processError);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception', error);
  });

  process.on('exit', (exitCode) => {
    console.info(`Node process exiting -> Exit Code ${exitCode}`);
  });

  process.on('multipleResolves', (type, promise, reason) => {
    console.warn('Multiple Promise resolutions', { promise, reason, type });
  });
};
