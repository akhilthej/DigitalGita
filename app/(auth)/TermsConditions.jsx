import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsConditions = () => {
  return (
    <View className=' flex-1 bg-white h-full'>
      <SafeAreaView className='flex-1  '>
        <ScrollView className='flex-1 px-4 py-6'>
          <Text className='text-2xl font-bold mb-4'>Terms and Conditions</Text>
          <Text className='text-base mb-2'>
            Welcome to our application. If you continue to browse and use this application, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [Your Company Name]'s relationship with you in relation to this application.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>1. Acceptance of Terms</Text>
          <Text className='text-base mb-2'>
            By accessing or using our app, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this app.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>2. Use License</Text>
          <Text className='text-base mb-2'>
            Permission is granted to temporarily download one copy of the materials (information or software) on [Your Company Name]'s application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </Text>
          <Text className='text-base mb-2'>
            - Modify or copy the materials;
            {"\n"}- Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
            {"\n"}- Attempt to decompile or reverse engineer any software contained on [Your Company Name]'s application;
            {"\n"}- Remove any copyright or other proprietary notations from the materials; or
            {"\n"}- Transfer the materials to another person or "mirror" the materials on any other server.
          </Text>
          <Text className='text-base mb-2'>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by [Your Company Name] at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>3. Disclaimer</Text>
          <Text className='text-base mb-2'>
            The materials on [Your Company Name]'s application are provided on an 'as is' basis. [Your Company Name] makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Text>
          <Text className='text-base mb-2'>
            Further, [Your Company Name] does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>4. Limitations</Text>
          <Text className='text-base mb-2'>
            In no event shall [Your Company Name] or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on [Your Company Name]'s application, even if [Your Company Name] or a [Your Company Name] authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>5. Accuracy of materials</Text>
          <Text className='text-base mb-2'>
            The materials appearing on [Your Company Name]'s application could include technical, typographical, or photographic errors. [Your Company Name] does not warrant that any of the materials on its website are accurate, complete or current. [Your Company Name] may make changes to the materials contained on its website at any time without notice. However, [Your Company Name] does not make any commitment to update the materials.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>6. Links</Text>
          <Text className='text-base mb-2'>
            [Your Company Name] has not reviewed all of the sites linked to its application and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by [Your Company Name] of the site. Use of any such linked website is at the user's own risk.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>7. Modifications</Text>
          <Text className='text-base mb-2'>
            [Your Company Name] may revise these terms of service for its application at any time without notice. By using this application you are agreeing to be bound by the then current version of these terms of service.
          </Text>
          <Text className='text-lg font-bold mt-4 mb-2'>8. Governing Law</Text>
          <Text className='text-base mb-2'>
            These terms and conditions are governed by and construed in accordance with the laws of [Your State/Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TermsConditions;
