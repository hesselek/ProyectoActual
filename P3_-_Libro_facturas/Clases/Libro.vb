Public Class Libro
    Implements IEnumerable(Of Factura)

    'Atributos
    Private iPos As Integer
    Private oFacturas As List(Of Factura)

    'Constructor
    Public Sub New()

        Me.oFacturas = New List(Of Factura)
        Me.iPos = -1
    End Sub

    'Propiedades
    Public ReadOnly Property Anterior() As Factura
        Get
            Dim oFact As Factura


            If oFacturas.Count = 0 Then
                oFact = Nothing
                iPos = -1
            ElseIf Me.iPos = 0 Then

                oFact = Me.oFacturas(Me.iPos)
            Else

                Me.iPos = Me.iPos - 1

                oFact = Me.oFacturas(Me.iPos)
            End If

            Return oFact
        End Get

    End Property

    Public ReadOnly Property Primera() As Factura
        Get
            Dim oFact As Factura

            If oFacturas.Count = 0 Then
                oFact = Nothing
                iPos = -1
            Else
                oFact = Me.oFacturas(0)
                iPos = 0
            End If

            Return oFact
        End Get
    End Property

    Public ReadOnly Property Siguiente() As Factura
        Get
            Dim oFact As Factura


            If oFacturas.Count = 0 Then
                oFact = Nothing
                iPos = -1
            ElseIf Me.iPos = Me.oFacturas.Count - 1 Then

                oFact = Me.oFacturas(Me.iPos)
            Else

                Me.iPos = Me.iPos + 1

                oFact = Me.oFacturas(Me.iPos)
            End If

            Return oFact
        End Get
    End Property

    Public ReadOnly Property Ultima() As Factura
        Get
            Dim oFact As Factura

            If oFacturas.Count = 0 Then
                oFact = Nothing
                iPos = -1
            Else
                oFact = Me.oFacturas(Me.oFacturas.Count - 1)
                iPos = Me.oFacturas.Count - 1
            End If

            Return oFact
        End Get
    End Property

    'Métodos

    Public Sub AñadirFactura(ByVal oFact As Factura)

        Me.oFacturas.Add(oFact)

    End Sub

    Public Sub Borrar(ByVal oFact As Factura)
        Dim oFactura As Factura

        If Me.oFacturas.Remove(oFact) = True Then

            oFactura = Me.Primera

        End If
    End Sub

    Public Function ListadoSimple() As String
        Dim sCad As String
        Dim dbTotal As Double = 0

        sCad = "**************************" & ControlChars.NewLine
        sCad = sCad & "LISTADO SIMPLE DE FACTURAS" & ControlChars.NewLine
        sCad = sCad & "**************************" & ControlChars.NewLine

        sCad = sCad & "CODIGO".PadRight(8) & "CLIENTE".PadRight(30) & "NIF".PadRight(10) & "TOTAL FACTURA" & ControlChars.NewLine
        sCad = sCad & "------  ----------------------------  " & "--------- " & "-------------" & ControlChars.NewLine

        'Voy a recorrerlo con un enumerador
        'Declaro el enumerador
        Dim oEnumerador As IEnumerator(Of Factura)

        'Obtengo el enumerador
        oEnumerador = Me.GetEnumerator

        'Recorro el enumerador
        While oEnumerador.MoveNext

            sCad = sCad & oEnumerador.Current.CodigoFact.ToString().PadLeft(6) & Space(2)
            sCad = sCad & oEnumerador.Current.Cliente.Nombre.PadRight(30)
            sCad = sCad & oEnumerador.Current.Cliente.NIF.PadRight(9)
            sCad = sCad & oEnumerador.Current.TotalConIVA.ToString("0.00").PadLeft(14)
            sCad = sCad & ControlChars.NewLine

            dbTotal = dbTotal + oEnumerador.Current.TotalConIVA

        End While

        'Linea de total
        sCad = sCad & Space(38) & "-----------------------" & ControlChars.NewLine
        sCad = sCad & Space(38) & "TOTAL : " & dbTotal.ToString("0.00").PadLeft(15) & ControlChars.NewLine
        sCad = sCad & Space(38) & "-----------------------" & ControlChars.NewLine
        Return sCad
    End Function
    Public Function ListadoAgrupado() As String
        Dim sCad As String
        Dim sNIFAnt As String = ""
        Dim dbTotal As Double

        sCad = "****************************" & ControlChars.NewLine
        sCad = sCad & "LISTADO AGRUPADO DE FACTURAS" & ControlChars.NewLine
        sCad = sCad & "****************************" & ControlChars.NewLine

        'Lo primero es ordenar por código de cliente
        'Paso 1 - Instanciacion del objeto que contiene el metodo que define el criterio de ordenacion
        Dim oCriterioCliente As New FactCriterioCliente

        'Paso 2 - Ordenacion con el objeto de la clase que implementa IComparer en base al codigo de cliente
        Me.oFacturas.Sort(oCriterioCliente)

        'Voy a recorrerlo con un enumerador
        'Declaro el enumerador
        Dim oEnumerador As IEnumerator(Of Factura)

        'Obtengo el enumerador
        oEnumerador = Me.GetEnumerator

        'Recorro el enumerador
        While oEnumerador.MoveNext

            'Detecto el cambio de NIF
            If sNIFAnt <> oEnumerador.Current.Cliente.NIF Then

                If sNIFAnt <> "" Then
                    'Doy los totales del cliente anterior
                    sCad = sCad & "TOTAL:".PadRight(30) & dbTotal.ToString("0.00") & ControlChars.NewLine

                    'Inicializo el acumulador de importes
                    dbTotal = 0

                End If

                'Escribo la cabecera del nuevo cliente
                sCad = sCad & "-----------------------------------------------------------------" & ControlChars.NewLine
                sCad = sCad & "NIF:" & oEnumerador.Current.Cliente.NIF & ControlChars.NewLine
                sCad = sCad & "NOMBRE:" & oEnumerador.Current.Cliente.Nombre & ControlChars.NewLine
                sCad = sCad & "CODIGO DE FACTURA".PadRight(30) & "IMPORTE" & ControlChars.NewLine

                'Guardo el NIF actual para poder compararlo con el proximo
                sNIFAnt = oEnumerador.Current.Cliente.NIF

            End If

            sCad = sCad & oEnumerador.Current.CodigoFact.ToString.PadLeft(17) & Space(13)
            sCad = sCad & oEnumerador.Current.TotalConIva.ToString("0.00").PadLeft(6) & ControlChars.NewLine
            'Acumulo los importes de las facturas
            dbTotal = dbTotal + oEnumerador.Current.TotalConIVA

        End While

        'Doy los totales del ultimo cliente anterior
        sCad = sCad & "TOTAL:".PadRight(30) & dbTotal.ToString("0.00") & ControlChars.NewLine

        Return sCad
    End Function

    Public Function GetEnumerator() As System.Collections.Generic.IEnumerator(Of Factura) Implements System.Collections.Generic.IEnumerable(Of Factura).GetEnumerator
        Return Me.oFacturas.GetEnumerator
    End Function

    Public Function GetEnumerator1() As System.Collections.IEnumerator Implements System.Collections.IEnumerable.GetEnumerator
        Return Me.oFacturas.GetEnumerator
    End Function
End Class
