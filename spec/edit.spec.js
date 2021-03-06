/**
 * Copyright 2015 Workfront
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jasmine */

'use strict';

var angular = require('angular');

describe('edit', function() {
    beforeEach(function() {
        var ngModule = angular.module('mockModule', []);
        require('./../src/streamApiServiceProvider')(ngModule);
    });

    beforeEach(angular.mock.module('mockModule'));
    
    var streamApiService,
        $httpBackend;
    beforeEach(angular.mock.inject(function(_streamApiService_, _$httpBackend_) {
        streamApiService = _streamApiService_;
        $httpBackend = _$httpBackend_;
    }));
    
    var streamApi;
    beforeEach(function() {
        streamApi = streamApiService.getInstance({host: 'https://foo'});
    });

    it('should make call to correct url', function() {
        var requestedUrl = 'https://foo/attask/api-internal/task';
        $httpBackend.expectPUT(requestedUrl)
        .respond(200);
        streamApi.edit('task', '12345678', {});
        
        $httpBackend.flush();
    });

    it('should have correct data in request when passed objID as string', function() {
        var data = {
                name: 'some task name'
            },
            objID = '12345678';
        $httpBackend.expectPUT(/.*/, angular.extend({}, data, {ID: objID}))
        .respond(200);
        streamApi.edit('task', objID, data);
        
        $httpBackend.flush();
    });

    it('should have correct data in request when passed objID as string', function() {
        var data = {
                name: 'some task name'
            },
            objID = '12345678';
        data.ID = objID;
        $httpBackend.expectPUT(/.*/, data)
        .respond(200);
        streamApi.edit('task', objID, data);
        
        $httpBackend.flush();
    });

    it('should set correct headers', function() {
        var headerData = function(headers) {
            return headers['Content-Type'] === 'application/json;charset=utf-8';
        };
        
        $httpBackend.expectPUT(/.*/, /.*/, headerData)
        .respond(200);
        streamApi.edit('task', '12345678', {});
        
        $httpBackend.flush();
    });

    it('should throw when objCode doesn\'t passed', function() {
        expect(function() {
            streamApi.edit(undefined, {ID: '12345678'});
        }).toThrow(new Error('You must provide objCode of type string'));
        
    });

    it('should throw when objCode is not string', function() {
        expect(function() {
            streamApi.edit(1, {ID: '12345678'});
        }).toThrow(new Error('You must provide objCode of type string'));
        
    });

    it('should throw when data doesn\'t passed', function() {
        expect(function() {
            streamApi.edit('task', {ID: '12345678'});
        }).toThrow(new Error('You must provide edit data object as \'data\' argument'));
        
    });

    it('should throw when objID is not string', function() {
        expect(function() {
            streamApi.edit('task', 12345678, {});
        }).toThrow(new Error('You must provide either \'ojbID\' of type string or \'data\' with property ID'));
        
    });

    it('should throw when objID doesn\'t provided and data hasn\'t property ID', function() {
        expect(function() {
            streamApi.edit('task', undefined, {});
        }).toThrow(new Error('You must provide either \'ojbID\' of type string or \'data\' with property ID'));
        
    });
});
