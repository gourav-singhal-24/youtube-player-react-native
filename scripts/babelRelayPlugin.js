'use strict'

const getBabelRelayPlugin = require('babel-relay-plugin')
const introspectionQuery = require('graphql/utilities').introspectionQuery
const request = require('sync-request')

const url = 'http://172.18.2.195:3000/graphql'

const response = request('POST', url, {
  qs: {
    query: introspectionQuery
  }
})

const schema = JSON.parse(response.body.toString('utf-8'))

module.exports = { plugins: [getBabelRelayPlugin(schema.data, { abortOnError: true })] }
