// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable, Injector } from '@angular/core';
import { CoreSite } from '../classes/site';

/*
 * Provider to create sites instances.
*/
@Injectable()
export class CoreSitesFactoryProvider {

    constructor(private injector: Injector) {}

    /**
     * Make a site object.
     *
     * @param {string} id Site ID.
     * @param {string} siteUrl Site URL.
     * @param {string} [token] Site's WS token.
     * @param {any} [info] Site info.
     * @param {string} [privateToken] Private token.
     * @param {any} [config] Site public config.
     * @param {boolean} [loggedOut] Whether user is logged out.
     * @return {CoreSite} Site instance.
     * @description
     * This returns a site object.
     */
    makeSite(id: string, siteUrl: string, token?: string, info?: any, privateToken?: string,
            config?: any, loggedOut?: boolean) : CoreSite {
        return new CoreSite(this.injector, id, siteUrl, token, info, privateToken, config, loggedOut);
    }

    /**
     * Gets the list of Site methods.
     *
     * @return {string[]} List of methods.
     */
    getSiteMethods(): string[] {
        let methods = [];
        for (let name in CoreSite.prototype) {
            methods.push(name);
        }
        return methods;
    }
}
