import {QueryResultCache} from "./QueryResultCache";
import {QueryRunner} from "..";
import {QueryResultCacheOptions} from "./QueryResultCacheOptions";
import {createNamespace, destroyNamespace, getNamespace, Namespace} from "cls-hooked";

export class LocalStorageQueryResultCache implements QueryResultCache {

    private storage: Namespace;

    constructor(readonly namespaceName: string) {
        this.storage = getNamespace(this.namespaceName) || createNamespace(this.namespaceName);
    }

    public async clear(queryRunner?: QueryRunner): Promise<void> {
        destroyNamespace(this.namespaceName);
        this.storage = getNamespace(this.namespaceName) || createNamespace(this.namespaceName);
    }

    public async connect(): Promise<void> {
        return;
    }

    public async disconnect(): Promise<void> {
        return;
    }

    public async getFromCache(options: QueryResultCacheOptions, queryRunner?: QueryRunner):
        Promise<QueryResultCacheOptions | undefined> {

        const result = this.storage.get(options.identifier);
        if (result) {
            console.log(`$$$$$$$$ returning cached result for id: ${options.identifier}`);
        }
        return result;
    }

    public isExpired(savedCache: QueryResultCacheOptions): boolean {
        return false;
    }

    public async remove(identifiers: string[], queryRunner?: QueryRunner): Promise<void> {
        for (let identifier of identifiers) {
            this.storage.set(identifier, undefined);
        }
    }

    public async storeInCache(options: QueryResultCacheOptions, savedCache: QueryResultCacheOptions | undefined,
                              queryRunner?: QueryRunner): Promise<void> {

        this.storage.set(options.identifier, options.result);
    }

    public async synchronize(queryRunner?: QueryRunner): Promise<void> {
        return;
    }

}
