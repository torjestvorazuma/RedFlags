import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, ScrollView, Text, TextInput, Button, Image, Linking, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

class ReferenceScreen extends React.Component {
  
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }

  render() {
    const score = this.state.score;
    return (
      <SafeAreaView style = {styles.background}>
        <View style={styles.headerTitle}>
        <Image style={styles.headerimagine} source={require('./components/green.png')}/>
        <Text style={styles.head}>Справочная информация</Text>
        </View>
        <Text style={styles.headcomment}>Представленные в приложении данные носят информационный характер и обновляются ежедневно.</Text>
        <ScrollView>
        <Text style={styles.headR}>Критерии благонадёжности{'\n'}</Text>
        <Text style={styles.headtype}>Общая информация{'\n'}</Text> 
        <Text style={styles.headtext}>Статус организации{'\n'}</Text>
        <Text style={styles.usualtext}>Позволяет отследить изменения статуса организации:</Text>
        <Text style={styles.usualtext}>1) Действующее</Text>
        <Text style={styles.usualtext}>2) Ликвидировано¹ - прекращение ЮЛ без перехода в порядке универсального правопреемства его прав и обязанностей к другим лицам.</Text>
        <Text style={styles.usualtext}>3) Реорганизация² - слияние, присоединение, разделение, выделение, преобразование ЮЛ. Может быть осуществлена по решению его учредителей (участников) или органа ЮЛ, уполномоченного на то учредительным документом.</Text>
        <Text style={styles.usualtext}>4) Банкротство³ - влечет ликвидацию ЮЛ. {'\n'}</Text>
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_5142/974be1fad91d7bc49b99851f8e9fc52eae6af180/#:~:text=%D0%9B%D0%B8%D0%BA%D0%B2%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%20%D1%8E%D1%80%D0%B8%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%20%D0%BB%D0%B8%D1%86%D0%B0,-(%D0%B2%20%D1%80%D0%B5%D0%B4.&text=%D0%AE%D1%80%D0%B8%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5%20%D0%BB%D0%B8%D1%86%D0%BE%20%D0%BB%D0%B8%D0%BA%D0%B2%D0%B8%D0%B4%D0%B8%D1%80%D1%83%D0%B5%D1%82%D1%81%D1%8F%20%D0%BF%D0%BE%20%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8E,%D1%86%D0%B5%D0%BB%D0%B8%2C%20%D1%80%D0%B0%D0%B4%D0%B8%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%B9%20%D0%BE%D0%BD%D0%BE%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%BE.`)}
           style={styles.link}>
         ¹Ст. 61 Гражданского кодекса РФ
        </Text> 
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_5142/63213653d504d250157b82cd9d3232e3c26b5782/`)}
           style={styles.link}>
         ²Ст. 57 Гражданского кодекса РФ
        </Text> 
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_5142/19ffe4557b522640a73f0063867edce518a7dfc1/`)}
           style={styles.link}>
         ³Ст. 25 Гражданского кодекса РФ
        </Text> 
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_39331/8764f1ea3b4838d75bea542a4b17522b6649f35d/`)}
           style={styles.link}>
         Ст. 2 Федеральный закон «О несостоятельности (банкротстве)»{'\n'}{'\n'}
        </Text> 
        <Text style={styles.headtext}>Возраст организации{'\n'}</Text>
        <Text style={styles.usualtext}>Чем дольше компания существует, тем ниже вероятность того, что она окажется неблагонадежной.{'\n'}Недавно зарегистрированные организации менее устойчивы к изменениям на рынке. 
        {'\n'}Также имеется риск сотрудничества с «фирмой-однодневкой». Срок существования «фирм-однодневок» крайне мал — от одного года до двух лет, за который они успевают ликвидироваться до проведения необходимых проверок¹.
 {'\n'}</Text>
        <Text onPress={() => Linking.openURL(`https://login.consultant.ru/?overror=SESSION_EXPIRED&returnUrl=base%3DPKBO%26cacheid%3D45DA2EBE3A3AD50FE58A42CD59EFD157%26dst%3D100083%26mode%3Dsplus%26n%3D50202%26req%3Ddoc%26rnd%3DFC53FED36C1C4F14EE691F9BF89C616C%26ts%3D113313642509701417050120058#jcvm30q2c9`)}
           style={styles.link}>
         ¹Готовое решение: Налоговые риски (КонсультантПлюс,2021)
        </Text> 
        <Text style={styles.linktoK}>(ссылка на коммерческую версию СПС "КонсультантПлюс"){'\n'}{'\n'}</Text>
        <Text style={styles.headtext}>Массовость адреса{'\n'}</Text>
        <Text style={styles.usualtext}>Массовость адреса может свидетельствовать о существовании "фирмы-однодневки".</Text>
        <Text style={styles.usualtext}>Под фирмой-однодневкой в самом общем смысле понимается юридическое лицо, не обладающее фактической самостоятельностью, созданное без цели ведения предпринимательской деятельности, как правило, не представляющее налоговую отчетность, зарегистрированное по адресу массовой регистрации и т.д.¹. {'\n'}</Text> 
        <Text style={styles.usualtext}>Такого термина как «адрес массовой регистрации» законодательство не содержит, однако предполагается, что для признания его таковым достаточно факта регистрации по нему 5 организаций².{'\n'}</Text>
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_98034/`)}
           style={styles.link}>
          ¹Письмо ФНС РФ от 11.02.2010 № 3-7-07/84
        </Text> 
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_198382/`)}
           style={styles.link}>
          ²Приказ ФНС РФ от 11.02.2016 № ММВ-7-14/72@{'\n'}{'\n'}
        </Text>  
        <Text style={styles.headtext}>Бухгалтерия{'\n'}</Text>
        <Text style={styles.usualtext}>Полученные данные в виде баланса, прибыли и выручки позволяют сделать сразу несколько важных выводов о компании:{'\n'}1) подтверждает, что организация сдает отчетность;{'\n'}2) позволяет установить, велась ли компанией хозяйственная деятельность;{'\n'}3) дает информацию о «портфеле» средств, которыми располагает организация.</Text>
        <Text style={styles.usualtext}>Сам факт непредставления в налоговый орган бухгалтерской отчетности должника свидетельствует о недобросовестном поведении руководителя должника, направленном на сокрытие сведений об имуществе, имущественных правах и обязательствах организации¹.{'\n'}</Text>
        <Text style={styles.usualtext}>Однако представление в налоговой орган бухгалтерской отчетности с нулевыми показателями может указывать на необоснованную налоговую выгоду контрагента².{'\n'}</Text>
        <Text style={styles.headtextImportant}>Важно!</Text>
        <Text style={styles.usualtext}>Слишком низкие по сравнению с суммой предполагаемой сделки обороты компании могут свидетельствовать о том, что компания укрывает часть доходов. 
Если один из показателей за сравнительным период понизился более, чем на 25%, то стоит задуматься о благонадежности контрагента.{'\n'}
</Text>
        <Text onPress={() => Linking.openURL(`https://login.consultant.ru/?overror=SESSION_EXPIRED&returnUrl=base%3DRAPS015%26cacheid%3D3450FE06FE386E787829137F3EE3E0A2%26mode%3Dsplus%26n%3D168596%26req%3Ddoc%26rnd%3D4656394A859C44DD58A078A92E7C5965%26ts%3D29801328705676626996281804#76f7rcfnaa`)}
           style={styles.link}>
          ¹Постановление Пятнадцатого арбитражного апелляционного суда от 23.04.2019 № 15АП-22083/2018 по делу № А32-29544/2015
        </Text>  
        <Text style={styles.linktoK}>(ссылка на коммерческую версию СПС "КонсультантПлюс"){'\n'}</Text>
        <Text onPress={() => Linking.openURL(`https://login.consultant.ru/?overror=SESSION_EXPIRED&returnUrl=base%3DQUEST%26cacheid%3DE3E617A8D59C8F930C633D31D047F118%26mode%3Dsplus%26n%3D82176%26req%3Ddoc%26rnd%3D4656394A859C44DD58A078A92E7C5965%26ts%3D334200342032932553133397713#8m6o9j6vuv0`)}
           style={styles.link}>
          ²Письмо Минфина РФ от 16.04.2010 № 03-02-08/25
        </Text> 
        <Text style={styles.linktoK}>(ссылка на коммерческую версию СПС "КонсультантПлюс"){'\n'}{'\n'}</Text>
        <Text style={styles.headtype}>Задолженности{'\n'}</Text> 
        <Text style={styles.headtext}>Исполнительные производства{'\n'}</Text> 
        <Text style={styles.usualtext}>Если организация не погасила задолженность добровольно, суд принимает решение о принудительном взыскании.{'\n'}Наличие небольших штрафов является показателем реальной деятельности компании. Однако наличие крупных сумм исполнительных производств (65% и выше от всех имеющихся средств компании) — это признак потенциально неблагонадежного контрагента.{'\n'}</Text>
        <Text style={styles.usualtext}>Долги напрямую связаны с возможностью банкротства компании. Дело в том, что арбитражным судом может быть возбуждено производство по делу о банкротстве, если требования к требованию к должнику - юридическому лицу в совокупности составляют не менее чем триста тысяч рублей¹.{'\n'}</Text>
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_39331/3fe8d4aaca9650ba62c13ae54fcab444cc149ef2/`)}
           style={styles.link}>
          ¹п. 2 ст. 6 ФЗ «О несостоятельности (банкротстве)»{'\n'}{'\n'}
        </Text> 
        <Text style={styles.headtype}>Судебная нагрузка{'\n'}</Text> 
        <Text style={styles.headtext}>Дела в качестве истца</Text> 
        <Text style={styles.arbitr}>(находящиеся в производстве и завершенные){'\n'}</Text>
        <Text style={styles.usualtext}>Количество исков в качестве истца, составляющее более 70% от всех судебных дел, может свидетельствовать о риске недобросовестности компании при сотрудничестве. {'\n'}</Text>
        <Text style={styles.headtext}>Дела в качестве ответчика</Text>
        <Text  style={styles.arbitr}>(находящиеся в производстве){'\n'}</Text>
        <Text style={styles.usualtext}>Множество исков к компании как к ответчику может говорить о постоянном нарушении обязательств перед контрагентами. Если общая сумма исков составляет 50-70% (оранжевый индикатор), 70% и выше (красный индикатор) от всех имеющихся средств организации, то компания с большей вероятностью не сможет в полной мере и в срок рассчитаться по своим обязательствам.{'\n'}</Text>

        <Text style={styles.headtype}>Актуальность данных{'\n'}</Text> 
        <Text style={styles.usualtext}>Данные предоставлены DaMIA-API. DaMIA-API гарантирует актуальность данных на 0:00 МСК текущей даты.{'\n'}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#F8F8FF',
    height: '100%'
  },
  arbitr:{
    color: 'grey',
  },
  linktoK: {
    color: 'grey',
    textAlign: 'right',
  },
  headtype:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headcomment: {
    fontSize: 14,
    backgroundColor: "#B0BDC1",
    textAlign: 'center'
  },
  
  headtextImportant: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#FF5656'
  },
  headtext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'green'
  },
  usualtext: {
    fontSize: 18,
    marginLeft: 10
  },
  link: {
    fontSize: 18,
    color: '#5961AB',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  headerTitle: {
    flexDirection: 'row',
    backgroundColor: '#5961AB'

  },
  head: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginTop : 35
  },
  headR: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginTop : 13
  },
  headerimagine: {
    //position: 'absolute',
    //width: '50%',
    //height: '50%',
    //justifyContent: 'center',
    //alignItems: 'center',
    width: 70,
    height: 70,
    marginHorizontal: 2,
  
  }

});
export default ReferenceScreen;