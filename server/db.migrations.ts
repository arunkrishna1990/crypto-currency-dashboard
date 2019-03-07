const Umzug = require('umzug');

class MigrationMeta {
  private migratedFiles: string[] = [];

  constructor(private pendingMigrations: any) {
  }

  private getFileNames(migrations: any[]) {
    return migrations.map(migration => {
      return migration.file.replace(/\.js$/, '');
    });
  }

  get pendingMigrationFiles() {
    return this.getFileNames(this.pendingMigrations)
  }

  addMigrated(fileName: string) {
    this.migratedFiles.push(fileName);
  }

  get filesForReverting() {
    return [...this.migratedFiles].reverse();
  }

  hasFilesToBeReverted() {
    return this.migratedFiles.length > 0;
  }
}

export const migrate = async (sequelize: any) => {
  const umzug = initUmzug(sequelize);
  const pendingMigrations = await umzug.pending();
  const migrationInfo = new MigrationMeta(pendingMigrations);

  migratedHandler(umzug, migrationInfo);

  try {
    await runPendingMigrations(umzug, migrationInfo.pendingMigrationFiles);
  } catch (ex) {
    if (migrationInfo.hasFilesToBeReverted()) {
      await revertMigration(migrationInfo, umzug);
    }
    return Promise.reject('migration failed');
  }
};

const initUmzug = (sequelize: any) => {
  return new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        sequelize.constructor,
        () => {
          throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
        }
      ],
      path: './src/shared/db/migrations',
      pattern: /\.js$/
    },
    logging: function () {
      console.log.apply(null, <any>arguments);
    },
  });
};

const migratedHandler = (umzug: any, migrationInfo: MigrationMeta) => {
  umzug.on('migrated', (name: string) => {
    migrationInfo.addMigrated(name);
  });
};

const runPendingMigrations = async (umzug: any, pendingMigrationFiles: string[]) => {
  return await umzug.execute({
    migrations: pendingMigrationFiles,
    method: 'up'
  });
};

const revertMigration = async (migrationInfo: MigrationMeta, umzug: any) => {
  try {    
    await umzug.down({ migrations: migrationInfo.filesForReverting });
  } catch (ex) {
    console.error('Revert Migration Failed', ex);
  }
};
