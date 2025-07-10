param profileName string = 'zimax-fd'
param resourceGroupName string = 'aimcs-rg-eastus2'
param endpointName string = 'zimax'
param routeName string = 'zimax-route'
param ruleSetName string = 'security-headers'
param ruleName string = 'add-security-headers'

resource afdProfile 'Microsoft.Cdn/profiles@2021-06-01' existing = {
  name: profileName
}

resource afdRuleSet 'Microsoft.Cdn/profiles/ruleSets@2021-06-01' = {
  name: ruleSetName
  parent: afdProfile
  location: 'Global'
}

resource afdRule 'Microsoft.Cdn/profiles/ruleSets/rules@2021-06-01' = {
  name: ruleName
  parent: afdRuleSet
  properties: {
    order: 1
    conditions: [] // Match all requests
    actions: [
      {
        name: 'ModifyResponseHeader'
        parameters: {
          headerAction: 'Overwrite'
          headerName: 'Strict-Transport-Security'
          value: 'max-age=63072000; includeSubDomains; preload'
        }
      }
      {
        name: 'ModifyResponseHeader'
        parameters: {
          headerAction: 'Overwrite'
          headerName: 'X-Frame-Options'
          value: 'DENY'
        }
      }
      {
        name: 'ModifyResponseHeader'
        parameters: {
          headerAction: 'Overwrite'
          headerName: 'X-Content-Type-Options'
          value: 'nosniff'
        }
      }
      {
        name: 'ModifyResponseHeader'
        parameters: {
          headerAction: 'Overwrite'
          headerName: 'Referrer-Policy'
          value: 'strict-origin-when-cross-origin'
        }
      }
      {
        name: 'ModifyResponseHeader'
        parameters: {
          headerAction: 'Overwrite'
          headerName: 'X-XSS-Protection'
          value: '1; mode=block'
        }
      }
      {
        name: 'ModifyResponseHeader'
        parameters: {
          headerAction: 'Overwrite'
          headerName: 'Content-Security-Policy'
          value: 'default-src \'self\''
        }
      }
    ]
    matchProcessingBehavior: 'Stop'
    enabledState: 'Enabled'
  }
}

resource afdEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2021-06-01' existing = {
  name: endpointName
  parent: afdProfile
}

resource afdRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2021-06-01' existing = {
  name: routeName
  parent: afdEndpoint
}

resource afdRouteRuleSetAssociation 'Microsoft.Cdn/profiles/afdEndpoints/routes/ruleSet@2021-06-01' = {
  name: ruleSetName
  parent: afdRoute
  properties: {
    ruleSet: {
      id: afdRuleSet.id
    }
  }
} 
