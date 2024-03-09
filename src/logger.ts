export enum LogLevel {
  DEBUG = 10,
  INFO = 20,
  ERROR = 30,
}

export const LogLevelStrings = {
  [LogLevel.DEBUG]: "DEBUG",
  [LogLevel.INFO]: "INFO",
  [LogLevel.ERROR]: "ERROR",
};

export class Logger {
  level: LogLevel = LogLevel.INFO;

  public debug(message: string, ...substs: any[]) {
    this.log(LogLevel.DEBUG, message, substs);
  }

  public info(message: string, ...substs: any[]) {
    this.log(LogLevel.INFO, message, substs);
  }

  public error(message: string, ...substs: any[]) {
    this.log(LogLevel.ERROR, message, substs);
  }

  private log(level: LogLevel, message: string, substs: any[]) {
    if (level >= this.level)
      console.log(`${LogLevelStrings[level]} ${message}`, ...substs);
  }
}

export const log = new Logger();
